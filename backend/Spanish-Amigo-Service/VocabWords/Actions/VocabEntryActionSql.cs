
using System.Text.Json;
using ConsoleApp1;
using Dapper;
using Newtonsoft.Json.Linq;
using Npgsql;
using SqlKata;
using SqlKata.Compilers;

namespace Spanish_Amigo_Service.Actions;

public class VocabAction : IVocabWordsAction
{
    private static readonly HttpClient _httpClient = new HttpClient();

    private readonly IConfiguration _configuration;
    public VocabAction(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<VocabEntry>> GetVocabWords()
    {
        using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"))) // Use NpgsqlConnection
        {
            await connection.OpenAsync();

            // Build the query using SQLKata
            var query = new Query("translations").Select("*");

            // Compile the query to get SQL and parameters
            var compiler = new PostgresCompiler();
            var sql = compiler.Compile(query);

            // Execute the query using Dapper
            var translations = await connection.QueryAsync<VocabEntry>(sql.Sql);
            return translations.ToList();
        }
    }

    public async Task<VocabEntry> GenerateDraft(string spanishWord)
    {
        string url = $"https://dictionaryapi.com/api/v3/references/spanish/json/{spanishWord}?key=0264a0de-3422-49b0-bf81-77174ebb7e88";
        var response = await _httpClient.GetAsync(url);
        string json = await response.Content.ReadAsStringAsync();
        JArray resultArray = JArray.Parse(json);
        return GenerateDraft(resultArray);
    }
    public async Task<List<VocabEntry>> InsertVocabEntry(List<VocabEntry> vocabEntries)
    {
        var createdVocabEntries = new List<VocabEntry>();
        using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"))) // Use NpgsqlConnection
        {
            await connection.OpenAsync();

            foreach (var vocabEntry in vocabEntries)
            {
                // Build the query using SQLKata
                var query = new Query("translations").AsInsert(vocabEntry, true);
                // Compile the query to get SQL and parameters
                var compiler = new PostgresCompiler();
                var sql = compiler.Compile(query);
                // Execute the query using Dapper
                //vocabEntry.Id = await connection.QuerySingleAsync<int>(sql.Sql, sql.NamedBindings);
                createdVocabEntries.Add(vocabEntry);
            }
        }
        return createdVocabEntries;
    }

    private VocabEntry GenerateDraft(JArray result)
    {
        if (result is null || !result.Any())
        {
            return null;
        }

        return null;
    }

}
