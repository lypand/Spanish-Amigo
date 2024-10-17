using ConsoleApp1;
using MongoDB.Driver;
using Spanish_Amigo_Service.Auth.Models;
using Spanish_Amigo_Service.Models;

namespace Spanish_Amigo_Service.VocabWords.Connections;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<ProfileDataModel> ProfileData => _database.GetCollection<ProfileDataModel>("profile_data");
}
