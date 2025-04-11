## Raster

Place all high-density (2x) raster graphics from the design into the `raw/images/` folder. This folder is ignored by Git.

After adding new graphics, immediately run the command `npm run optimize:raster` (or `npm run optimize`) to optimize the images and generate `.webp` versions. This command only needs to be run once each time new raster graphics are added.

The optimized graphics (with multiple resolutions and density suffixes in filenames) will appear in `source/images`. These optimized files should be committed to the repository.


## Vector

Place vector graphics for the sprite (icons) in:

```shell
└── raw/
    └── icons/
```

Place content vector graphics (logos, charts, illustrations) in:

```shell
└── raw/
    └── images/
```
Running `npm run optimize:vector` will place optimized copies of these SVG files into the corresponding folders in the source directory:

```shell
└── source/
    ├── icons/
    └── images/
```
