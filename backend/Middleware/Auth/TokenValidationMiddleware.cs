using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class TokenValidationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _secretKey;

    public TokenValidationMiddleware(RequestDelegate next, string secretKey)
    {
        _next = next;
        _secretKey = secretKey;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Headers.TryGetValue("Authorization", out var tokenHeader))
        {
            var token = tokenHeader.ToString().Split(" ").Last();

            if (ValidateToken(token, out var claimsPrincipal))
            {
                context.User = claimsPrincipal;
            }
        }

        await _next(context);
    }

    private bool ValidateToken(string token, out ClaimsPrincipal claimsPrincipal)
    {
        claimsPrincipal = null;
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

            claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
