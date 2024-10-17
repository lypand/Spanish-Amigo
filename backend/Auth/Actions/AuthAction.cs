using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;
using Spanish_Amigo_Service.Auth.Models;
using Spanish_Amigo_Service.Repositories;

namespace Spanish_Amigo_Service.Auth.Actions;

public class AuthAction : IAuthAction
{
    private readonly IRepository _repository;
    public AuthAction(IRepository repository)
    {
        if (repository is null)
        {
            throw new ArgumentNullException($"Dependency {nameof(IRepository)} was null.");
        }
        _repository = repository;
    }

    public async Task<string> HandleAuth(string token)
    {
        try
        {
            var validationSettings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new[] { "626523891185-mi6vmd33rdl1hs90sbgpolvrc0b1cdr9.apps.googleusercontent.com" }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);

            var email = payload.Email;

            var user = await _repository.FindApplicationUserByEmail(email);

            if (user == null)
            {
                // Create a new user if not found
                user = new ApplicationUser { Email = email };
                user.Roles.Add(UserRole.User); // Assign default role
                await _repository.InsertNewApplicationUser(user);
            }

            string tokenString = GenerateJwtToken(user);
            return tokenString;
        }
        catch (Exception ex)
        {
            throw new UnauthorizedAccessException();
        }
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        // Set the token expiration time
        var expires = DateTime.UtcNow.AddHours(1); // Token valid for 1 hour

        // Create claims
        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        // Add roles as claims
        foreach (var role in user.Roles)
        {
            claims = claims.Append(new Claim(ClaimTypes.Role, role.ToString())).ToArray();
        }

        // Create the signing key
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("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asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfassdfasdfasdfasfasdf")); // Use a strong secret key
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Create the token
        var token = new JwtSecurityToken(
            issuer: "yourIssuer",  // Your issuer
            audience: "yourAudience", // Your audience
            claims: claims,
            expires: expires,
            signingCredentials: creds);

        // Return the token as a string
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
