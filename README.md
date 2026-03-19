[docs-img]: https://img.shields.io/badge/docs-stable-blue.svg
[docs-url]: https://juliagizmos.github.io/WebIO.jl/stable/

# WebIO

| Build | Coverage | Docs |
|-------|----------|------|
| [![CI](https://github.com/JuliaGizmos/WebIO.jl/actions/workflows/tests.yml/badge.svg)](https://github.com/JuliaGizmos/WebIO.jl/actions/workflows/tests.yml) | [![codecov](https://codecov.io/gh/JuliaGizmos/WebIO.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/JuliaGizmos/WebIO.jl) | [![][docs-img]][docs-url]

WebIO provides a simple abstraction for displaying and interacting with web content. It works with:

- [Juno](http://junolab.org) - The hottest Julia IDE
- [IJulia](https://github.com/JuliaLang/IJulia.jl) - Jupyter notebooks for Julia
- [Blink](https://github.com/JunoLab/Blink.jl) - An [Electron](http://electron.atom.io/) wrapper to make desktop apps
- [Mux](https://github.com/JuliaWeb/Mux.jl) - A web server framework

People using WebIO
------------------

This is a non-comprehensive list of projects using WebIO.

+ [Interact.jl](https://github.com/JuliaGizmos/Interact.jl) - Interactive widgets to play with your Julia code
+ [MeshCat.jl](https://github.com/rdeits/MeshCat.jl) - WebGL-based 3D visualizer in Julia
+ [PlotlyJS.jl](https://github.com/sglyon/PlotlyJS.jl) - Julia library for plotting with plotly.js
+ [Julia Tetris](http://juliatetris.com)

Web Artifacts
[bundle.tar.gz](https://github.com/pankgeorg/WebIO.jl/files/8111257/bundle.tar.gz)


## Important — Release Notes & Quick Install (READ FIRST)
---------------------------------------------------------

- **PR base:** This branch builds on https://github.com/JuliaGizmos/WebIO.jl/pull/498 and includes additional edits made after commit `eab90`.
- **Runtime fix (metadata):** We tightened access to `notebook.model.metadata` to avoid runtime errors when metadata is a plain object vs an observable. See `webio_jupyter_extension/webio-jupyter-labextension/labextension.ts` for the exact change.
- **Prebuilt wheel included:** A prebuilt wheel was produced and uploaded to the repository at:

- `webio_jupyter_extension/dist/webio_jupyter_extension-0.1.0-py3-none-any.whl`

- Quick install (from repo root):

```bash
# Install directly from this repository (wheel hosted in the branch):
pip install https://github.com/moyhig-ecs/WebIO.jl/raw/apply-compare-0556c09/webio_jupyter_extension/dist/webio_jupyter_extension-0.1.0-py3-none-any.whl

# Or install from the repository via git (builds from source):
pip install "git+https://github.com/moyhig-ecs/WebIO.jl.git@apply-compare-0556c09#egg=webio_jupyter_extension"
```

- After installing the wheel or the git package, the Jupyter extension and the WebIO provider should work locally (tested with the packaged wheel).

If you want this wheel attached to a GitHub release or uploaded to PyPI, tell me and I can prepare a release draft and upload the artifact.

## Compare with upstream

View the changes in this work branch compared to the upstream repository:

[Compare JuliaGizmos/WebIO.jl (master) ⇢ moyhig-ecs/apply-compare-0556c09](https://github.com/JuliaGizmos/WebIO.jl/compare/master...moyhig-ecs:apply-compare-0556c09)
