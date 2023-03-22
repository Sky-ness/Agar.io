import path from 'path';

export default {
	// Fichier d'entrée :
	entry: './client/src/main.js',
	// Fichier de sortie :
	output: {
		path: path.resolve(process.cwd(), './client/public/build'),
		filename: 'main.bundle.js',
		publicPath: '/build/',
	},
	// compatibilité anciens navigateurs (si besoin du support de IE11 ou android 4.4)
	target: ['web', 'es5'],
	// connexion webpack <-> babel :
	module: {
		rules: [
			{
				test: /\.js$/, // tous les fichiers js ...
				exclude: /node_modules/, // ... sauf le dossier node_modules ...
				use: {
					// ... seront compilés par babel !
					loader: 'babel-loader',
				},
			},
		],
	},
	devtool: 'source-map',
	devServer: {
		hot: false, // désactivation hot-reload (inutilisé)
		static: {
			directory: './client/public', // racine du serveur http
			watch: {
				// optimisation live-reload
				ignored: 'node_modules',
			},
		},
		port: 8000,
		historyApiFallback: true, // gestion deeplinking
	},
};
