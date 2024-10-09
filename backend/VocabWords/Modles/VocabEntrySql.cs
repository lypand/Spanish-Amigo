using SqlKata;

namespace ConsoleApp1;

public class VocabEntrySql
{
    [Ignore]
    public int Id { get; set; }
    public string SpanishTranslation { get; set; }
    public string EnglishTranslation { get; set; }
    public string EnglishSentence { get; set; }
    public string SpanishSentence { get; set; }
    public string Conjugations { get; set; }

}
