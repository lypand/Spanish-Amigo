using ConsoleApp1;
using Spanish_Amigo_Service.Actions;
using Spanish_Amigo_Service.VocabWords.Connections;
using Spanish_Amigo_Service.Auth.Actions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Spanish_Amigo_Service.Repositories;
using Spanish_Amigo_Service.Repositories.Mappers;
using Microsoft.IdentityModel.Protocols.Configuration;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
        
        var appSecret =
            builder.Configuration["ApplicationSecret"];

        if (appSecret is null)
        {
            throw new InvalidConfigurationException($"Could not find variable for ApplicationSecret in {nameof(Program)}.");
        }

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSecret)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
        });

        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder.AllowAnyOrigin()
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });
        }
        else
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.AllowAnyOrigin()
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });
        }

        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

            // Define the Bearer token security scheme
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter your bearer token",
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey
            });

            // Apply the security requirement to all endpoints
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {}
                }
            });
        });
        var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings");
        if(mongoDbSettings is null)
        {
            throw new InvalidConfigurationException($"MongoDbSettings were not configured in {nameof(Program)}");
        }
        var connectionString = mongoDbSettings.GetValue<string>("ConnectionString");
        if (connectionString is null)
        {
            throw new InvalidConfigurationException($"ConnectionString was not configured in {nameof(Program)}");
        }
        var databaseName = mongoDbSettings.GetValue<string>("DatabaseName");
        if (databaseName is null)
        {
            throw new InvalidConfigurationException($"DatabaseName was not configured in {nameof(Program)}");
        }
        builder.Services.AddSingleton(new MongoDbContext(connectionString, databaseName));

        builder.Services.AddSingleton<IVocabWordsAction, VocabAction>();
        builder.Services.AddSingleton<IAuthAction, AuthAction>();
        builder.Services.AddSingleton<IRepository, MongoRepository>();
        builder.Services.AddSingleton<IUserContextAction, UserContextAction>();
        builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        builder.Services.AddSingleton<IProfileDataMapper, ProfileDataMapper>();

        var app = builder.Build();

        Console.WriteLine($"Current environment is {app.Environment}");

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        if (app.Environment.IsDevelopment())
        {
            app.UseCors("AllowAll");
        }
        else
        {
            app.UseCors("AllowSpecificOrigin");
        }
        app.UseMiddleware<TokenValidationMiddleware>(appSecret);
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}


