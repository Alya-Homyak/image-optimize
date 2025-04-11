import gulp from 'gulp';
import sharp from 'gulp-sharp-responsive';
import svgo from 'gulp-svgmin';
// import { stacksvg } from 'gulp-stacksvg';
// import svgSprite from 'gulp-svg-sprite';

const { src, dest } = gulp;
const PATH_TO_SOURCE = './source/';
const PATH_TO_RAW = './raw/';

export function optimizeRaster () {
  const RAW_DENSITY = 2;
  const TARGET_FORMATS = [undefined, 'webp']; // undefined — initial format: jpg or png

  function createOptionsFormat() {
    const formats = [];

    for (const format of TARGET_FORMATS) {
      for (let density = RAW_DENSITY; density > 0; density--) {
        formats.push(
          {
            format,
            rename: { suffix: `@${density}x` },
            width: ({ width }) => Math.ceil(width * density / RAW_DENSITY),
            jpegOptions: { progressive: true },
          },
        );
      }
    }

    return { formats };
  }

  return src(`${PATH_TO_RAW}images/**/*.{png,jpg,jpeg}`)
    .pipe(sharp(createOptionsFormat()))
    .pipe(dest(`${PATH_TO_SOURCE}images`));
}

export function optimizeVector () {
  return src([`${PATH_TO_RAW}**/*.svg`])
    .pipe(svgo())
    .pipe(dest(PATH_TO_SOURCE));
}

// export function createStack () {
//   return src(`${PATH_TO_SOURCE}icons/**/*.svg`)
//     .pipe(stacksvg())
//     .pipe(dest(`${PATH_TO_SOURCE}icons`));
// }

// export function createSprite() {
//   const config = {
//     mode: {
//       symbol: {
//         dest: '.', // сохраняем в текущую директорию (т.е. ./source/icons)
//         sprite: 'sprite.svg', // имя итогового спрайта
//         example: false // не генерировать HTML превью
//       }
//     },
//     shape: {
//       id: {
//         generator: function (name) {
//           return name.split('/').pop().replace('.svg', ''); // сохраняем оригинальные имена
//         }
//       },
//       transform: [], // отключаем svgo, чтобы сохранить оригинальные цвета
//       spacing: {
//         padding: 0
//       },
//       attributes: {
//         preserve: true // сохраняет атрибуты path и не вставляет fill="none" в <symbol>
//       }
//     },
//     svg: {
//       xmlDeclaration: false,
//       doctypeDeclaration: false,
//       namespaceIDs: false,
//       dimensionAttributes: false, // не вставлять width/height в <symbol>
//       symbol: {
//         attrs: false // отключает автоматическую вставку атрибутов в <symbol>
//       }
//     }
//   };

//   return src(`${PATH_TO_SOURCE}icons/**/*.svg`)
//     .pipe(svgSprite(config))
//     .pipe(dest(`${PATH_TO_SOURCE}icons`));
// }
