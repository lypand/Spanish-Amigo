using ConsoleApp1;
using MongoDB.Driver;

namespace Spanish_Amigo_Service.VocabWords.Connections;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<VocabEntry> VocabEntries => _database.GetCollection<VocabEntry>("vocab_entries");
}
