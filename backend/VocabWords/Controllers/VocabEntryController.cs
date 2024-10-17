using ConsoleApp1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Spanish_Amigo_Service.Auth.Actions;
using Spanish_Amigo_Service.Dtos;

namespace Spanish_Amigo_Service.Controllers;

[ApiController]
[Authorize(Roles = "User")]
[Route("[controller]")]
public class VocabController : ControllerBase
{
    private readonly IVocabWordsAction _vocabWordsAction;
    private readonly IUserContextAction _userContextAction;

    public VocabController(
        IVocabWordsAction vocabWordsAction,
        IUserContextAction userContextAction)
    {
        _vocabWordsAction = vocabWordsAction;
        _userContextAction = userContextAction;
    }

    [HttpGet("/VocabEntries")]
    public async Task<IActionResult> Get()
    {
        var applicationUser = _userContextAction.GetCurrentUserContext();
        var vocabWords = await _vocabWordsAction.GetVocabWords(applicationUser.Id);
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
        [FromBody] List<VocabEntryInput> vocabEntries)
    {
        var applicationUser = _userContextAction.GetCurrentUserContext();
        var vocabWords = await _vocabWordsAction.InsertVocabEntry(vocabEntries, applicationUser.Id);
        return Ok(vocabWords);
    }
}
