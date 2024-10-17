
using ConsoleApp1;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using Spanish_Amigo_Service.Dtos;
using Spanish_Amigo_Service.Repositories;

namespace Spanish_Amigo_Service.Actions;

public class VocabAction : IVocabWordsAction
{
    private readonly IRepository _repository;
    private static readonly HttpClient _httpClient = new HttpClient();

    public VocabAction(
        IRepository repository)
    {
        if (repository is null)
        {
            throw new ArgumentException($"Property of {nameof(IRepository)} was not provided");
        }

        _repository = repository;
    }

    public async Task<List<VocabEntry>> GetVocabWords(ObjectId userId)
    {
        List<VocabEntry> results = await _repository.GetVocabWords(userId);
        return results;
    }

    public async Task<VocabEntry> GenerateDraft(string spanishWord)
    {
        string url = $"https://dictionaryapi.com/api/v3/references/spanish/json/{spanishWord}?key=0264a0de-3422-49b0-bf81-77174ebb7e88";
        var response = await _httpClient.GetAsync(url);
        string json = await response.Content.ReadAsStringAsync();
        JArray resultArray = JArray.Parse(json);
        return GenerateDraft(resultArray, spanishWord);
    }
    public async Task<List<VocabEntry>> InsertVocabEntry(List<VocabEntryInput> vocabEntries, ObjectId userId)
    {
        return await _repository.InsertVocabEntry(vocabEntries.Select(v => new VocabEntry()
        {
            Conjugations = v.Conjugations,
            EnglishTranslations = v.EnglishTranslations,
            Sentences = v.Sentences,
            SpanishWord = v.SpanishWord,
        }).ToList(), userId);
    }

    private VocabEntry GenerateDraft(JArray jArray, string spanishWord)
    {
        var vocabEntry = new VocabEntry()
        {
            SpanishWord = spanishWord,
        };
        if (jArray is null || !jArray.Any())
        {
            return vocabEntry;
        }

        JToken? item = jArray.FirstOrDefault();

        if (item is null || item is not JObject)
        {
            return vocabEntry;
        }

        vocabEntry.Sentences = ExtractSentencesFromDefinition(item.Value<JArray>("def"));
        vocabEntry.Conjugations.AddRange(GetConjugation(item.Value<JToken?>("suppl")));
        vocabEntry.EnglishTranslations.AddRange(GetEnglishTranslations(item.Value<JToken>("shortdef")));

        return vocabEntry;
    }

    private List<Sentence> ExtractSentencesFromDefinition(JArray sseqArray)
    {
        var sentences = new List<Sentence>();

        if (sseqArray == null)
        {
            return sentences;
        }

        foreach (var seq in sseqArray)
        {
            foreach (var definitionGroup in seq)
            {
                foreach (var definition in definitionGroup)
                {
                    if (definition is JArray defArray)
                    {
                        foreach (var def in defArray)
                        {
                            if (def is JArray defArray2)
                            {
                                foreach (var d in def)
                                {
                                    if (d is JArray defArray3)
                                    {
                                        foreach (var d2 in d)
                                        {
                                            if (d2 is JObject definitionObj)
                                            {
                                                var sentenceItems = definitionObj.Value<JArray>("dt");
                                                if (sentenceItems != null)
                                                {
                                                    sentences.AddRange(ExtractSentencesFromItems(sentenceItems));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return sentences;
    }

    private List<Sentence> ExtractSentencesFromItems(JArray items)
    {
        var result = new List<Sentence>();
        foreach (var item in items)
        {
            if (item is JArray sentences)
            {
                foreach (var sentenceArray in sentences)
                {
                    if (sentenceArray is JArray array)
                    {
                        foreach (var sentenceArray1 in sentenceArray)
                        {
                            var spanish = sentenceArray1.Value<string>("t");
                            var english = sentenceArray1.Value<string>("tr");
                            if (english is not null || spanish is not null)
                            {
                                result.Add(new Sentence()
                                {
                                    English = english,
                                    Spanish = spanish,
                                });
                            }
                        }
                    }
                }
            }
        }

        return result;
    }

    private IEnumerable<Conjugation> GetConjugation(JToken? jToken)
    {
        var conjugations = new List<Conjugation>();

        if (jToken is null)
        {
            return conjugations;
        }

        conjugations.AddRange(GetConjugationEntries(jToken.Value<JArray>("cjts")));

        return conjugations;
    }

    private IEnumerable<Conjugation> GetConjugationEntries(JToken? jToken)
    {
        var conjugations = new List<Conjugation>();

        if (jToken is null)
        {
            return conjugations;
        }

        foreach (var value in jToken)
        {
            conjugations.Add(GetConjugationEntry(value));
        }
        return conjugations;
    }
    private Conjugation GetConjugationEntry(JToken jToken)
    {
        if (jToken is null)
        {
            return null;
        }

        var tense = jToken.Value<string>("cjid");

        return new Conjugation()
        {
            Tense = tense,
            Values = GetConjugationValues(jToken.Value<JArray>("cjfs")),
        };
    }

    private List<string> GetConjugationValues(JArray? jArray)
    {
        var values = new List<string>();

        if (jArray is null)
        {
            return values;
        }

        foreach (var value in jArray)
        {
            values.Add(value.Value<string>());
        }

        return values;
    }

    private IEnumerable<string> GetEnglishTranslations(JToken jToken)
    {
        var englishTranslations = new List<string>();
        if (jToken is null)
        {
            return englishTranslations;
        }

        foreach (var englishTranslation in jToken)
        {
            englishTranslations.Add(englishTranslation.Value<string>());
        }

        return englishTranslations;
    }
}
