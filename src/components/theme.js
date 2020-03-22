export default {
	space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
	fonts: {
		body:
			'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
		heading:
			'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
		monospace: "Menlo, monospace"
	},
	fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
	fontWeights: {
		body: 400,
		heading: 600,
		bold: 700
	},
	lineHeights: {
		body: 1.75,
		heading: 1.25
	},
	colors: {
		text: "#454f5b",
		background: "#fff",
		primary: "#5c6ac4",
		secondary: "#006fbb",
		highlight: "#47c1bf",
		muted: "#e6e6e6",
		gray: "#dfe3e8",
		accent: "#f49342",
		darken: "#00044c",
		red: "#f44",
		yellow: "#ffd533",
		green: "#44ff50",
		modes: {
			// Change to dark later, put in to test light mode
			dar: {
				text: "#3e4155",
				background: "#000639",
				primary: "#9c6ade",
				secondary: "#b4e1fa",
				highlight: "#b7ecec",
				muted: "#e6e6e6"
			}
		}
	},
	styles: {
		root: {
			fontFamily: "body",
			lineHeight: "body",
			fontWeight: "body"
		},
		h1: {
			color: "text",
			fontFamily: "heading",
			lineHeight: "heading",
			fontWeight: "heading",
			fontSize: 5
		},
		h2: {
			color: "text",
			fontFamily: "heading",
			lineHeight: "heading",
			fontWeight: "heading",
			fontSize: 4
		},
		h3: {
			color: "text",
			fontFamily: "heading",
			lineHeight: "heading",
			fontWeight: "heading",
			fontSize: 3
		},
		h4: {
			color: "text",
			fontFamily: "heading",
			lineHeight: "heading",
			fontWeight: "heading",
			fontSize: 2
		},
		h5: {
			color: "text",
			fontFamily: "heading",
			lineHeight: "heading",
			fontWeight: "heading",
			fontSize: 1
		},
		h6: {
			color: "text",
			fontFamily: "heading",
			lineHeight: "heading",
			fontWeight: "heading",
			fontSize: 0
		},
		p: {
			color: "text",
			fontFamily: "body",
			fontWeight: "body",
			lineHeight: "body"
		},
		a: {
			color: "primary"
		},
		pre: {
			fontFamily: "monospace",
			overflowX: "auto",
			code: {
				color: "inherit"
			}
		},
		code: {
			fontFamily: "monospace",
			fontSize: "inherit"
		},
		table: {
			width: "100%",
			borderCollapse: "separate",
			borderSpacing: 0
		},
		th: {
			textAlign: "left",
			borderBottomStyle: "solid"
		},
		td: {
			textAlign: "left",
			borderBottomStyle: "solid"
		},
		img: {
			maxWidth: "100%"
		}
	},
	variants: {
		frameButton: {
			p: "10px",
			transition: "0.5s",
			":hover": {
				boxShadow: "2px 2px",
				cursor: "pointer"
			}
		},
		sideBarButton: {
			p: "5px",
			width: "100%",
			fontWeight: "bold",
			":hover": {
				bg: "primary",
				color: "white",
				cursor: "pointer"
			}
		}
	}
};
