using ConsoleApp1;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Spanish_Amigo_Service.Auth.Models;

namespace Spanish_Amigo_Service.Models;

public class ProfileDataModel
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Email { get; set; }
    public List<UserRole> Roles { get; set; } = new List<UserRole>();
    public List<VocabEntry> VocabWords { get; set; } = new List<VocabEntry>();
}
