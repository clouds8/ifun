import React from 'react';
import ReactDom from 'react-dom'
import { connect } from 'react-redux';
import { createSelectNavAction } from './apptopAction';
import './apptop.css';

function mapStateToProps(state, ownProps) {
    return {
        navlist: state.navlist
    }
}

function matchDispatchToProps(dispatch, ownProps) {
    return {}
}


class AppTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navlist: props.navlist || [],
            currentNav: null,
            globalNav: props.currentNav || (Array.isArray(props.navlist) && props.navlist[0] && props.navlist[0].id),
            subOffset: 0,
            subVisible: false,
            fixedNav: false
        };
        this.subref = {};
        this.subNavTimeoutEvent = null;
        this.subNavRef = React.createRef();
        this.bannerRef = React.createRef();
    }

    onNavClick(e, id) {
        console.log('click ', id)
        let list = this.state.navlist.filter((value) => {
            if (value.id === id) {
                return true
            }
        })
        if (list.length) {
            this.setState({ globalNav: id })
        }
    }

    onNavHover(e, id) {
        console.log('id:', id)
        this.subNavTimeoutEvent && clearTimeout(this.subNavTimeoutEvent)
        let target = e.target
        let navliOffsetLine = target.offsetLeft + target.offsetWidth / 2
        let subOffset = navliOffsetLine - (this.subref[id].offsetWidth) / 2
        this.setState({ subOffset, subVisible: true, currentNav: id })
    }

    recoverSub() {
        this.subNavTimeoutEvent = setTimeout(() => {
            this.setState({ currentNav: null, subVisible: false, subOffset: 0 })
        }, 1000);
    }

    storeSubNavRef(e, id) {
        this.subref[id] = e
    }


    componentDidMount() {
        window.addEventListener('scroll', () => {
            let { top } = this.bannerRef.current.getBoundingClientRect()
            let { offsetHeight, offsetTop } = this.bannerRef.current
            console.log(top, offsetHeight, offsetTop);
            if (top <= offsetTop - offsetHeight) {
                // this.subNavRef.current.style.position = "fixed"
                this.setState({ fixedNav: true })
            } else {
                // this.subNavRef.current.style.position = "relative"
                this.setState({ fixedNav: false })
            }
        })

    }

    render() {
        const { navlist } = this.props;
        const { currentNav, globalNav, subOffset, subVisible, fixedNav } = this.state;

        return (
            <div className="headtop">
                <div className="topbar">
                    <div className="headtop-main">
                        <div className="nav-left">
                            <div className="logo">
                                <a href="#">
                                    <img src="http://cdn.aixifan.com/acfun-pc/2.3.35/img/logo.png" alt="" />
                                </a>
                            </div>
                            <div className="icon-container icon-game">
                                <a href="#">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-game"></use>
                                    </svg>
                                    <span>游戏中心</span>
                                </a>
                            </div>
                            <div className="icon-container icon-niudan">
                                <a href="#">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-niudan"></use>
                                    </svg>
                                    <span>扭蛋机</span>
                                </a>
                            </div>
                        </div>
                        <div className="nav-center"></div>
                        <div className="nav-right">
                            <div className="icon-container">
                                <a href="#">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-history"></use>
                                    </svg>
                                </a>
                                <a href="#">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-upload"></use>
                                    </svg>
                                </a>
                                <a href="#">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-old_collect"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner" ref={this.bannerRef}>
                    {/* <a href="http://www.acfun.cn/v/ac4363749" target="_blank"></a> */}
                    <a href="http://imgs.aixifan.com/cms/2018_05_31/1527769608292.png" target="_blank"></a>
                </div>
                <div className={fixedNav ? "subnavbar fix" : "subnavbar"} ref={this.subNavRef}>
                    <div className="navlist">
                        <ul>
                            {Array.isArray(navlist) && navlist.map((value, i) => {
                                let id = value.id;
                                let link;
                                if (value.sub.length < 1) {
                                    return (
                                        <li key={id}>
                                            <a href="/aczy" className={id === globalNav ? "selectednav" : ""} onClick={(e) => { this.onNavClick(e, value.id) }}>{value.name}</a>
                                        </li>
                                    )
                                }
                                return (
                                    <li key={id} onMouseOver={(e) => this.onNavHover(e, value.id)} onMouseLeave={() => this.recoverSub()}>
                                        <a href="#" className={id === globalNav ? "selectednav" : ""} onClick={(e) => { this.onNavClick(e, value.id) }}>{value.name}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={!subVisible ? "subnavlist hidesubnavlist" : "subnavlist"} onMouseOver={(e) => subVisible && this.subNavTimeoutEvent && clearTimeout(this.subNavTimeoutEvent)} onMouseLeave={() => this.recoverSub()} >
                        {
                            Array.isArray(navlist) && navlist.map((nitem, ni) => {
                                let sub = nitem.sub;
                                if (sub.length < 1) return
                                return (
                                    <ul key={nitem.id} ref={(e) => this.storeSubNavRef(e, nitem.id)} style={{ left: subOffset, visibility: subVisible && currentNav === nitem.id ? 'visible' : 'hidden' }}>
                                        {
                                            sub.map((sitem, si) => si === 0 ? null : <li key={sitem.id}><a href="#">{sitem.name}</a></li>)
                                        }
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        )
    }
}



export default connect(mapStateToProps, matchDispatchToProps)(AppTop);