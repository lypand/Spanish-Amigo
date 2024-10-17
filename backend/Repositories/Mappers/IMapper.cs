using System;
using ConsoleApp1;
using Spanish_Amigo_Service.Auth.Models;
using Spanish_Amigo_Service.Models;
using Spanish_Amigo_Service.Repositories.BusinessModels;

namespace Spanish_Amigo_Service.Repositories.Mappers;

public interface IProfileDataMapper
{
    public ProfileDataModel Convert(ApplicationUser applicationUser, List<VocabEntry> vocabEntries);
    public ProfileConversationResult Convert(ProfileDataModel profileDataModel);
}
