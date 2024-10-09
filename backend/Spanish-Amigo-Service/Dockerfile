# Use the official ASP.NET runtime as a base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Spanish-Amigo-Service.csproj", "Spanish-Amigo-Service/"]
RUN dotnet restore "Spanish-Amigo-Service/Spanish-Amigo-Service.csproj"
WORKDIR "/src/Spanish-Amigo-Service"
COPY . .
RUN dotnet build "Spanish-Amigo-Service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Spanish-Amigo-Service.csproj" -c Release -o /app/publish

# Final stage/image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Spanish-Amigo-Service.dll"]