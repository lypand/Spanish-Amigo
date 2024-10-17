using ConsoleApp1;
using Spanish_Amigo_Service.Auth.Models;
using Spanish_Amigo_Service.Models;
using Spanish_Amigo_Service.Repositories.BusinessModels;

namespace Spanish_Amigo_Service.Repositories.Mappers;

public class ProfileDataMapper : IProfileDataMapper
{
    public ProfileDataModel Convert(ApplicationUser applicationUser, List<VocabEntry> vocabEntries)
    {
        return new ProfileDataModel
        {
            Email = applicationUser.Email,
            Id = applicationUser.Id,
            Roles = applicationUser.Roles,
            VocabWords = vocabEntries,
        };
    }

    public ProfileConversationResult Convert(ProfileDataModel profileDataModel)
    {
        if (profileDataModel is null)
        {
            return null;
        }
        return new ProfileConversationResult
        {
            ApplicationUser = new ApplicationUser()
            {
                Email = profileDataModel.Email,
                Id = profileDataModel.Id,
                Roles = profileDataModel.Roles,
            },
            VocabEntries = profileDataModel.VocabWords,
        };
    }
}
