/**
 * External dependencies
 */
import { css, styled } from '@wp-g2/styles';
import { render } from '@testing-library/react';

describe( 'css', () => {
	describe( 'basic', () => {
		test( 'should return a string', () => {
			const style = css`
				background: blue;
				color: red;
			`;

			expect( typeof style ).toBe( 'string' );
		} );

		test( 'should create styles bound to a className', () => {
			const style = css`
				background: blue;
				color: red;
			`;

			const { container } = render( <div className={ style } /> );

			expect( container.firstChild ).toHaveStyle( {
				background: 'blue',
				color: 'red',
			} );
		} );

		test( 'should create styles from an object', () => {
			const style = css( {
				background: 'blue',
				color: 'red',
			} );

			const { container } = render( <div className={ style } /> );

			expect( container.firstChild ).toHaveStyle( {
				background: 'blue',
				color: 'red',
			} );
		} );

		test( 'should create styles from an templates string literal', () => {
			const background = 'blue';
			const style = css`
				background: ${ background };
				color: red;
			`;

			const { container } = render( <div className={ style } /> );

			expect( container.firstChild ).toHaveStyle( {
				background: 'blue',
				color: 'red',
			} );
		} );
	} );

	describe( 'plugins', () => {
		test( 'should render reliably in an environment with existing styles', () => {
			// Simulate an environment with existing styles
			const existingStyles = document.createElement( 'style' );
			existingStyles.innerHTML = `div.box { background: green; }`;
			document.querySelector( 'head' ).appendChild( existingStyles );

			const style = css`
				background: blue;
			`;

			const { container } = render(
				<div className={ `box ${ style }` } />
			);

			expect( container.firstChild ).toHaveStyle( `background: blue;` );

			// Clean up
			document.querySelector( 'head' ).removeChild( existingStyles );
		} );

		test( 'should automatically render rtl styles', () => {
			// Simulate an rtl environment
			document.documentElement.setAttribute( 'dir', 'rtl' );
			// Create the style
			const style = css`
				padding-right: 55px;
				margin-right: 55px;
				right: 55px;
				transform: translateX( 55% );
			`;

			const { container } = render( <div className={ style } /> );

			expect( container.firstChild ).toHaveStyle( `margin-left: 55px;` );
			expect( container.firstChild ).toHaveStyle( `padding-left: 55px;` );
			expect( container.firstChild ).toHaveStyle( `left: 55px;` );
			expect( container.firstChild ).toHaveStyle(
				`transform: translateX( -55% );`
			);

			expect( container.firstChild ).not.toHaveStyle(
				`margin-right: 55px;`
			);
			expect( container.firstChild ).not.toHaveStyle(
				`padding-right: 55px;`
			);
			expect( container.firstChild ).not.toHaveStyle( `right: 55px;` );
			expect( container.firstChild ).not.toHaveStyle(
				`transform: translateX( 55% );`
			);
			// Reset an rtl environment
			document.documentElement.removeAttribute( 'dir' );
		} );
	} );
} );

describe( 'styled', () => {
	test( 'should create a styled component', () => {
		const Component = styled.div`
			background: blue;
		`;

		const { container } = render( <Component /> );

		expect( container.firstChild ).toHaveStyle( { background: 'blue' } );
	} );

	test( 'should style an existing component', () => {
		const Previous = ( props ) => <div { ...props } />;

		const Component = styled( Previous )`
			background: blue;
		`;

		const { container } = render( <Component /> );

		expect( container.firstChild ).toHaveStyle( { background: 'blue' } );
	} );
} );
