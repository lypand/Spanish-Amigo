using System;

namespace Spanish_Amigo_Service.Auth.Actions;

public interface IAuthAction
{
    public Task<string> HandleAuth(string token);

}
