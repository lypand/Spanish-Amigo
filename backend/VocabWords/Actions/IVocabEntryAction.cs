namespace ConsoleApp1;

public interface IVocabWordsAction
{
    public Task<List<VocabEntry>> GetVocabWords();
    public Task<VocabEntry> GenerateDraft(string spanishWord);
    public Task<List<VocabEntry>> InsertVocabEntry(List<VocabEntry> vocabEntries);
}
