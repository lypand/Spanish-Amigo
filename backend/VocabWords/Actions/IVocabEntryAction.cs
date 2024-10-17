using MongoDB.Bson;
using Spanish_Amigo_Service.Dtos;

namespace ConsoleApp1;

public interface IVocabWordsAction
{
    public Task<List<VocabEntry>> GetVocabWords(ObjectId userId);
    public Task<VocabEntry> GenerateDraft(string spanishWord);
    public Task<List<VocabEntry>> InsertVocabEntry(List<VocabEntryInput> vocabEntries, ObjectId userId);
}
