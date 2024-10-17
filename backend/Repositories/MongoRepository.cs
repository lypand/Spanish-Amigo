using ConsoleApp1;
using MongoDB.Bson;
using MongoDB.Driver;
using Spanish_Amigo_Service.Auth.Models;
using Spanish_Amigo_Service.Models;
using Spanish_Amigo_Service.Repositories.Mappers;
using Spanish_Amigo_Service.VocabWords.Connections;

namespace Spanish_Amigo_Service.Repositories;

public class MongoRepository : IRepository
{
    private readonly IProfileDataMapper _mapper;
    private static readonly HttpClient _httpClient = new HttpClient();
    private readonly MongoDbContext _context;

    public MongoRepository(
        MongoDbContext context,
        IProfileDataMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public async Task<List<VocabEntry>> GetVocabWords(ObjectId userId)
    {

        var result = await _context.ProfileData.Find(d => d.Id == userId).FirstOrDefaultAsync();
        BusinessModels.ProfileConversationResult businessObjects = _mapper.Convert(result);
        return businessObjects.VocabEntries;
    }

    public async Task<List<VocabEntry>> InsertVocabEntry(List<VocabEntry> vocabEntries, ObjectId userId)
    {
        var profileData = await _context.ProfileData.Find(d => d.Id == userId).FirstOrDefaultAsync();

        if (profileData == null)
        {
            return new List<VocabEntry>();
        }

        BusinessModels.ProfileConversationResult businessObjects = _mapper.Convert(profileData);
        businessObjects.VocabEntries.AddRange(vocabEntries);
        var dataModel = _mapper.Convert(businessObjects.ApplicationUser, businessObjects.VocabEntries);
        await _context.ProfileData.ReplaceOneAsync(u => u.Id == userId, dataModel);

        return await GetVocabWords(userId);
    }

    public async Task<ApplicationUser> FindApplicationUserById(ObjectId userId)
    {
        var result = await _context.ProfileData.Find(d => d.Id == userId).FirstOrDefaultAsync();
        BusinessModels.ProfileConversationResult businessObjects = _mapper.Convert(result);
        return businessObjects.ApplicationUser;
    }

    public async Task<ApplicationUser> FindApplicationUserByEmail(string email)
    {
        var result = await _context.ProfileData.Find(d => d.Email == email).FirstOrDefaultAsync();
        if (result is null)
        {
            return null;
        }
        BusinessModels.ProfileConversationResult businessObjects = _mapper.Convert(result);
        return businessObjects.ApplicationUser;
    }

    public async Task InsertNewApplicationUser(ApplicationUser applicationUser)
    {
        var profileDataModel = _mapper.Convert(applicationUser, new List<VocabEntry>());
        await _context.ProfileData.InsertOneAsync(profileDataModel);
    }
}
