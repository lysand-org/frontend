{
  lib,
  stdenv,
  pnpm,
  bun,
  nodejs,
  makeWrapper,
  ...
}: let
  packageJson = builtins.fromJSON (builtins.readFile ../package.json);
in
  stdenv.mkDerivation (finalAttrs: {
    pname = "versia-fe";
    version = packageJson.version;

    src = ../.;

    pnpmDeps = pnpm.fetchDeps {
      inherit (finalAttrs) pname version src;
      fetcherVersion = 3;
      hash = "sha256-cBcHtyffeFIJu7KkotI7aFA0Omlhd3uzE/W3zu/z+mo=";
    };

    nativeBuildInputs = [
      pnpm
      pnpm.configHook
      bun
      nodejs
      makeWrapper
    ];

    buildPhase = ''
      runHook preBuild

      # Disable telemetry, as it crashes the build
      export NUXT_TELEMETRY_DISABLED=1
      bun run emojis:generate
      bun run build

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      mkdir -p $out
      cp -r .output/public $out/${finalAttrs.pname}

      runHook postInstall
    '';

    meta = with lib; {
      description = packageJson.description;
      license = licenses.agpl3Only;
      maintainers = [
        {
          name = "CPlusPatch";
          email = "contact@cpluspatch.com";
          github = "CPlusPatch";
          githubId = 42910258;
          matrix = "@jesse:cpluspatch.dev";
        }
      ];
      platforms = ["x86_64-linux" "aarch64-linux"];
    };
  })
