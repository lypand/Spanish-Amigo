using System;
using ConsoleApp1;
using Spanish_Amigo_Service.Auth.Models;

namespace Spanish_Amigo_Service.Repositories.BusinessModels;

public class ProfileConversationResult
{
    public ApplicationUser ApplicationUser { get; set; }
    public List<VocabEntry> VocabEntries { get; set; }
}
