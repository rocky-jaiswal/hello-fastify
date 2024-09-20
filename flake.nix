{
  description = "fastify flake";

  # Flake inputs
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };

  # Flake outputs
  outputs = { self, nixpkgs }:
    let
      # Systems supported
      allSystems = [
        "x86_64-linux" # 64-bit Intel/AMD Linux
        #"aarch64-linux" # 64-bit ARM Linux
        #"x86_64-darwin" # 64-bit Intel macOS
        #"aarch64-darwin" # 64-bit ARM macOS
      ];

      # Helper to provide system-specific attributes
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      # Development environment output
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          # The Nix packages provided in the environment
          packages = with pkgs; [
            nodejs_20 # Node.js 20, plus npm, npx, and corepack
            yarn
            # lolcat
            # nodePackages.typescript-language-server
            # nodePackages.typescript
          ];

          # Environment variables
          env = {
            GREETING = "Hello Node!";
          };

          # A hook run every time you enter the environment
          shellHook = ''
            echo $GREETING | lolcat
          '';
        };
      });

#       packages = forAllSystems ({ pkgs }: {
#         default = pkgs.mkYarnPackage {
#           name = "app-name";
#
#           buildInputs = with pkgs; [
#             nodejs_20
#             yarn
#           ];
#
#           src = self;
#
# #          npmDepsHash = "";
#
# #         npmBuild = "yarn build";
#         };
#       });
    };
}
