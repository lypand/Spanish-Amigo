using ConsoleApp1;
using Microsoft.AspNetCore.Mvc;

namespace Spanish_Amigo_Service.Controllers;

[ApiController]
[Route("[controller]")]
public class VocabController : ControllerBase
{
    private readonly IVocabWordsAction _vocabWordsAction;

    public VocabController(IVocabWordsAction vocabWordsAction)
    {
        _vocabWordsAction = vocabWordsAction;
    }

    [HttpGet("/VocabEntries")]
    public async Task<IActionResult> Get()
    {
        var vocabWords = await _vocabWordsAction.GetVocabWords();
        return Ok(vocabWords);
    }

    [HttpGet("/DraftVocabEntries/{spanishWord}")]
    public async Task<IActionResult> GetDraft(
        string spanishWord
    )
    {
        var draft = await _vocabWordsAction.GenerateDraft(spanishWord);
        return Ok(draft);
    }

    [HttpPost("/VocabEntries")]
    public async Task<IActionResult> Post(
        [FromBody] List<VocabEntry> vocabEntries)
    {
        var vocabWords = await _vocabWordsAction.InsertVocabEntry(vocabEntries);
        return Ok(vocabWords);
    }
}
