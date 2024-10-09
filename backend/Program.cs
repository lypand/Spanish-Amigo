using ConsoleApp1;
using Spanish_Amigo_Service.Actions;
using Spanish_Amigo_Service.VocabWords.Connections;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
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
                    builder => builder.WithOrigins("https://your-production-domain.com") // Replace with your actual domain
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });
        }

        var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings");
        var connectionString = mongoDbSettings.GetValue<string>("ConnectionString");
        var databaseName = mongoDbSettings.GetValue<string>("DatabaseName");
        builder.Services.AddSingleton(new MongoDbContext(connectionString, databaseName));

        builder.Services.AddSingleton<IVocabWordsAction, VocabActionMongo>();

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

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}


