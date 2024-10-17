using Microsoft.AspNetCore.Mvc;
using Spanish_Amigo_Service.Auth.Actions;

namespace Spanish_Amigo_Service.Auth;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthAction _authAction;
    public AuthController(IAuthAction authAction)
    {
        _authAction = authAction;
    }

    [HttpPost("verify-token")]
    public async Task<IActionResult> VerifyToken([FromBody] string token)
    {
        try
        {
            var jwtToken = await _authAction.HandleAuth(token);
            return Ok(jwtToken);
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized();
        }
    }
}
