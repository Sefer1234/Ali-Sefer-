# GitHub Actions → Azure App Service CI/CD Demo

Bu layihə `main` branch-inə hər `git push` zamanı GitHub Actions ilə Node.js tətbiqini Azure App Service-ə deploy edir.

## 1. Azure-da Web App yarat

Azure Portal → **Create a resource** → **Web App**:

- Publish: Code
- Runtime stack: Node 22 LTS
- Operating System: Linux
- Pricing: test üçün uyğun Free/Basic plan (region və subscription imkanından asılıdır)

Web App yaradıldıqdan sonra onun adını qeyd et.

## 2. GitHub repository secrets əlavə et

GitHub repository → Settings → Secrets and variables → Actions → New repository secret.

İki secret yarat:

- `AZURE_WEBAPP_NAME` — Azure Web App-in adı
- `AZURE_WEBAPP_PUBLISH_PROFILE` — Azure Portal-da Web App → Get publish profile düyməsi ilə endirilən XML faylın bütün məzmunu

Publish profile XML məzmununu secret-ə olduğu kimi yapışdır. Faylı repository-yə commit etmə.

## 3. GitHub-a göndər

Layihə qovluğunda terminal aç:

```bash
git init
git add .
git commit -m "Initial Azure CI/CD demo"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

`USERNAME/REPOSITORY` hissəsini öz GitHub məlumatlarınla əvəz et.

## 4. Nəticəni yoxla

GitHub repository → **Actions** bölməsinə keç. `Build and deploy to Azure App Service` workflow-unu aç. Addımların yaşıl ✓ olması deploy-un uğurla tamamlandığını göstərir.

Sonra brauzerdə bu ünvanı aç:

`https://AZURE_WEBAPP_NAME.azurewebsites.net`

`AZURE_WEBAPP_NAME` yerinə öz Web App adını yaz.

## 5. Avtomatik yenilənməni yoxla

`public/index.html` faylında başlığı dəyiş, məsələn `Salam, Azure!` əvəzinə `CI/CD uğurla işləyir!` yaz. Sonra:

```bash
git add .
git commit -m "Update homepage"
git push
```

GitHub Actions yenidən işləyəcək. Workflow bitdikdən sonra saytı yenilə və dəyişiklikləri gör.

## Pipeline nə edir?

1. Checkout — repository kodunu runner-ə götürür.
2. Set up Node.js — Node.js 22 mühitini hazırlayır.
3. Install dependencies — npm paketlərini quraşdırır.
4. Run basic validation — JavaScript sintaksisini yoxlayır.
5. Deploy — tətbiqi Azure App Service-ə göndərir.

## Deploy jurnalı

Real deploy jurnalı GitHub-da **Actions → workflow run → job → hər addımın logları** bölməsində saxlanılır. Bu layihənin ayrıca `DEPLOY-LOG.md` faylına real nəticə yazmaq üçün şablon əlavə olunub.
