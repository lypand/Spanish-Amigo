using System;
using ConsoleApp1;
using MongoDB.Bson;
using Spanish_Amigo_Service.Auth.Models;

namespace Spanish_Amigo_Service.Repositories;

public interface IRepository
{
    public Task<List<VocabEntry>> GetVocabWords(ObjectId userId);
    public Task<List<VocabEntry>> InsertVocabEntry(List<VocabEntry> vocabEntries, ObjectId objectId);
    public Task<ApplicationUser> FindApplicationUserById(ObjectId userId);
    public Task<ApplicationUser> FindApplicationUserByEmail(string email);
    public Task InsertNewApplicationUser(ApplicationUser applicationUser);

}