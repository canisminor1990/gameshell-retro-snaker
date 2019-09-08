export default {
	history: 'hash',
	theme               : {
		'@primary-color'      : '#1964ff',
	},
	plugins             : [
		[
			'umi-plugin-react', {
			dva: {
				immer: true,
			},
			antd: true,
		}
		]
	],
};