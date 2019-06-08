let
  nixpkgs = builtins.fetchTarball {
    url    = "https://github.com/nixos/nixpkgs/archive/2633767b6042d9138b9e219d8eec69700f15110a.tar.gz";
    sha256 = "08c6m7hsnfrwv88hsni4i4l0a0gl8lax500avkaq38simwh7cx8b";
  };
in with import nixpkgs {};
stdenv.mkDerivation {
  name = "nix-shell";
  buildInputs = [
    nodejs-10_x
  ];
}
