using System;
using System.Security.Claims;
using MongoDB.Bson;
using Spanish_Amigo_Service.Auth.Models;

namespace Spanish_Amigo_Service.Auth.Actions;

public class UserContextAction : IUserContextAction
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserContextAction(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public ApplicationUser GetCurrentUserContext()
    {
        var httpContext = _httpContextAccessor.HttpContext;

        // Extract user information from HttpContext
        var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var username = httpContext.User.Identity.Name;
        var roles = httpContext.User.FindFirst(ClaimTypes.Role)?.Value.Split(',');

        return new ApplicationUser
        {
            Id = ObjectId.Parse(userId),
            Email = username,
            Roles = roles.Select(Enum.Parse<UserRole>).ToList()
        };
    }
}
