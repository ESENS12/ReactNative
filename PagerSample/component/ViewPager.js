//
// import React, { Component } from 'react';
// import {
//     View,
//     ScrollView,
//     StyleSheet,
//     Platform,
//     Dimensions,
//     Element,
// } from 'react-native';
//
// import ViewPager from  "@react-native-community/viewpager";
//
// type Props = {
//     onChangeThrottle?: number,
//     renderHeader?: (activePage: number) => Element<any>,
//     renderFooter?: (activePage: number) => Element<any>,
//     initialPage?: number,
//     onChangePage?: (page: number) => void,
//     children?: Array<Element<any>>,
//     style?: View.propTypes.style,
// };
//
// type State = {
//     width: number,
// };
//
// const { width } = Dimensions.get('window');
//
// class ViewPager extends Component {
//
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             width,
//         };
//
//         this.active = 0;
//         this.header = null;
//         this.footer = null;
//         this.pageDelayTimeout = null;
//         this.viewPager = null;
//         this.scrollView = null;
//
//         // iOS only
//         this.state = {
//             width: 0,
//             height: 0,
//         };
//     }
//
//     state: State;
//
//     /**
//      * Call inital page handlers on mount
//      */
//     componentDidMount() {
//         if (this.header && this.header.onChangePage) {
//             this.header.onChangePage(this.props.initialPage);
//         }
//         if (this.footer && this.footer.onChangePage) {
//             this.footer.onChangePage(this.props.initialPage);
//         }
//     }
//
//     /**
//      * Helper to set component refs
//      * @param type
//      * @param component
//      */
//     setRef = (type: string, component: any) => {
//         if (!component) {
//             this[type] = null;
//         } else {
//             this[type] = component;
//         }
//     }
//
//     /**
//      * @param component
//      */
//     setHeaderRef = (component: any) => {
//         this.setRef('header', component);
//     }
//
//     /**
//      * @param component
//      */
//     setFooterRef = (component: any) => {
//         this.setRef('footer', component);
//     };
//
//
//     /**
//      * Gets the current page index
//      * @returns {number}
//      */
//     get currentPage(): number {
//         return this.active;
//     }
//
//     /**
//      * Manually navigate to a page
//      * @param page
//      */
//     goToPage(page: number) {
//         this.active = page;
//
//         if (Platform.OS === 'android') {
//             this.viewPager.setPage(this.active);
//         } else {
//             this.scrollView.scrollTo({
//                 x: this.active * this.state.width,
//                 animated: true,
//             });
//         }
//
//         // Throttle page events to avoid spamming
//         clearTimeout(this.pageDelayTimeout);
//         this.pageDelayTimeout = setTimeout(() => {
//
//             if (this.header && this.header.onChangePage) {
//                 this.header.onChangePage(this.active);
//             }
//             if (this.footer && this.footer.onChangePage) {
//                 this.footer.onChangePage(this.active);
//             }
//             if (this.props.onChangePage) this.props.onChangePage(this.active);
//         }, this.props.onChangeThrottle || 250);
//     }
//
//     /**
//      * Handle a page change event
//      * @param e
//      * @returns {*}
//      */
//     handlePageChange(e: any) {
//         // Use ViewPager position
//         if (Platform.OS === 'android') {
//             return this.goToPage(e.nativeEvent.position);
//         }
//
//         // Calculate current index
//         const index = e.nativeEvent.contentOffset.x / this.state.width;
//
//         // Only call the function if the index is an integer (page)
//         if (index === parseInt(index)) {
//             // Don't do anything if it's bouncing out of view
//             if (index < 0 || index >= React.Children.count(this.props.children)) {
//                 return undefined;
//             }
//
//             return this.goToPage(index);
//         }
//
//         return undefined;
//     }
//
//     props: Props;
//
//     viewPager: any;
//     scrollView: any;
//
//     active: number;
//
//     header: any;
//
//     footer: any;
//
//     pageDelayTimeout: ?setTimeout;
//
//     /**
//      * Set the page dimensions
//      * @param e
//      */
//     setDimensions(e: any) {
//         this.setState({
//             width: e.nativeEvent.layout.width,
//             height: e.nativeEvent.layout.height,
//         });
//     }
//
//     /**
//      * Render each child view in the ViewPager
//      * @returns {*}
//      */
//     renderChildren() {
//         const iosStyles = {};
//
//         if (Platform.OS === 'ios') {
//             iosStyles.width = this.state.width;
//             iosStyles.height = this.state.height;
//         }
//
//         return React.Children.map(this.props.children, (child, index) => {
//             return (
//                 <View key={`vp_${index}`} style={[styles.container, iosStyles]}>
//                     {child}
//                 </View>
//             );
//         });
//     }
//
//     /**
//      * Render a paging ScrollView. No ViewPager exists on iOS.
//      * @returns {XML}
//      */
//     renderIOS() {
//         return (
//             <ScrollView
//                 ref={(s) => { this.scrollView = s; }}
//                 horizontal
//                 pagingEnabled
//                 removeClippedSubviews
//                 directionalLockEnabled
//                 scrollEventThrottle={100}
//                 bounces={false}
//                 scrollsToTop={false}
//                 automaticallyAdjustContentInsets={false}
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator={false}
//                 onScroll={(e) => this.handlePageChange(e)}
//                 onLayout={e => this.setDimensions(e)}
//                 contentOffset={{
//                     x: this.state.width * this.props.initialPage,
//                     y: 0,
//                 }}
//             >
//                 {this.renderChildren()}
//             </ScrollView>
//         );
//     }
//
//     /**
//      * Render a native scrollView
//      * @returns {XML}
//      */
//     renderAndroid() {
//         return (
//             <ViewPager
//                 keyboardDismissMode={'on-drag'}
//                 ref={(v) => { this.viewPager = v; }}
//                 initialPage={this.props.initialPage}
//                 onPageSelected={e => this.handlePageChange(e)}
//                 style={styles.container}
//             >
//                 {this.renderChildren()}
//             </ViewPager>
//         );
//     }
//
//     /**
//      * Render
//      * @returns {XML}
//      */
//     render() {
//         const props = {
//             initialPage: this.props.initialPage,
//             goToPage: this.goToPage.bind(this),
//             setHeaderRef: this.setHeaderRef,
//             setFooterRef: this.setFooterRef,
//         };
//
//         let header = null;
//         let footer = null;
//
//         if (this.props.renderHeader) {
//             header = React.cloneElement(this.props.renderHeader(props), props);
//         }
//         if (this.props.renderFooter) {
//             footer = React.cloneElement(this.props.renderFooter(props), props);
//         }
//
//         return (
//             <View style={[styles.container, this.props.style]}>
//                 {header}
//                 {Platform.OS === 'ios' ? this.renderIOS() : this.renderAndroid()}
//                 {footer}
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });
//
// export default ViewPager;