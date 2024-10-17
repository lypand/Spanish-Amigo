using System;
using Spanish_Amigo_Service.Auth.Models;

namespace Spanish_Amigo_Service.Auth.Actions;

public interface IUserContextAction
{
    public ApplicationUser GetCurrentUserContext();
}
