using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ConsoleApp1;
public class VocabEntry
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string SpanishWord { get; set; }
    public List<string> EnglishTranslations { get; set; } = new List<string>();
    public List<Sentence> Sentences { get; set; } = new List<Sentence>();
    public List<Conjugation> Conjugations { get; set; } = new List<Conjugation>();
}

public class Conjugation
{
    public string Tense { get; set; }
    public List<string> Values { get; set; }
}

public class Sentence
{
    public string Spanish { get; set; }
    public string English { get; set; }
}
