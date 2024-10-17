using System;
using ConsoleApp1;

namespace Spanish_Amigo_Service.Dtos;

public class VocabEntryInput
{
    public string SpanishWord { get; set; }
    public List<string> EnglishTranslations { get; set; } = new List<string>();
    public List<Sentence> Sentences { get; set; } = new List<Sentence>();
    public List<Conjugation> Conjugations { get; set; } = new List<Conjugation>();
}