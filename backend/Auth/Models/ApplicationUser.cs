using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Spanish_Amigo_Service.Auth.Models;

public class ApplicationUser
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Email { get; set; }
    public List<UserRole> Roles { get; set; } = new List<UserRole>();
}

public enum UserRole
{
    User,
    Admin,
}
