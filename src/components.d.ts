/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MainDb } from "./helpers/main-db";
export namespace Components {
    interface AdminPage {
        "db": MainDb;
    }
    interface AppRoot {
    }
    interface BannerBlock {
    }
    interface BusinessCardBlock {
        "buttonText": string;
        "description": string;
        "href": string;
        "icon": string;
        "name": string;
    }
    interface BusinessPage {
        "category": string;
        "db": MainDb;
        "slug": string;
    }
    interface CategoryPage {
        "category": string;
        "db": MainDb;
    }
    interface ContactPage {
    }
    interface ContentBgBlock {
    }
    interface ContentBlock {
    }
    interface FieldBlock {
        "iconSize": string;
        "isLink": boolean;
        "loading": boolean;
        "readOnly": boolean;
        "value": string;
    }
    interface FooterBlock {
        "instagram": string;
        "twitter": string;
        "youtube": string;
    }
    interface HeaderBlock {
    }
    interface HomePage {
        "db": MainDb;
    }
    interface MapBlock {
        "latitude": number;
        "longitude": number;
        "zoom": number;
    }
    interface NavLinkBlock {
        "current": boolean;
        "href": string;
    }
    interface NavbarBlock {
    }
    interface SubHeaderBlock {
    }
}
declare global {
    interface HTMLAdminPageElement extends Components.AdminPage, HTMLStencilElement {
    }
    var HTMLAdminPageElement: {
        prototype: HTMLAdminPageElement;
        new (): HTMLAdminPageElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLBannerBlockElement extends Components.BannerBlock, HTMLStencilElement {
    }
    var HTMLBannerBlockElement: {
        prototype: HTMLBannerBlockElement;
        new (): HTMLBannerBlockElement;
    };
    interface HTMLBusinessCardBlockElement extends Components.BusinessCardBlock, HTMLStencilElement {
    }
    var HTMLBusinessCardBlockElement: {
        prototype: HTMLBusinessCardBlockElement;
        new (): HTMLBusinessCardBlockElement;
    };
    interface HTMLBusinessPageElement extends Components.BusinessPage, HTMLStencilElement {
    }
    var HTMLBusinessPageElement: {
        prototype: HTMLBusinessPageElement;
        new (): HTMLBusinessPageElement;
    };
    interface HTMLCategoryPageElement extends Components.CategoryPage, HTMLStencilElement {
    }
    var HTMLCategoryPageElement: {
        prototype: HTMLCategoryPageElement;
        new (): HTMLCategoryPageElement;
    };
    interface HTMLContactPageElement extends Components.ContactPage, HTMLStencilElement {
    }
    var HTMLContactPageElement: {
        prototype: HTMLContactPageElement;
        new (): HTMLContactPageElement;
    };
    interface HTMLContentBgBlockElement extends Components.ContentBgBlock, HTMLStencilElement {
    }
    var HTMLContentBgBlockElement: {
        prototype: HTMLContentBgBlockElement;
        new (): HTMLContentBgBlockElement;
    };
    interface HTMLContentBlockElement extends Components.ContentBlock, HTMLStencilElement {
    }
    var HTMLContentBlockElement: {
        prototype: HTMLContentBlockElement;
        new (): HTMLContentBlockElement;
    };
    interface HTMLFieldBlockElement extends Components.FieldBlock, HTMLStencilElement {
    }
    var HTMLFieldBlockElement: {
        prototype: HTMLFieldBlockElement;
        new (): HTMLFieldBlockElement;
    };
    interface HTMLFooterBlockElement extends Components.FooterBlock, HTMLStencilElement {
    }
    var HTMLFooterBlockElement: {
        prototype: HTMLFooterBlockElement;
        new (): HTMLFooterBlockElement;
    };
    interface HTMLHeaderBlockElement extends Components.HeaderBlock, HTMLStencilElement {
    }
    var HTMLHeaderBlockElement: {
        prototype: HTMLHeaderBlockElement;
        new (): HTMLHeaderBlockElement;
    };
    interface HTMLHomePageElement extends Components.HomePage, HTMLStencilElement {
    }
    var HTMLHomePageElement: {
        prototype: HTMLHomePageElement;
        new (): HTMLHomePageElement;
    };
    interface HTMLMapBlockElement extends Components.MapBlock, HTMLStencilElement {
    }
    var HTMLMapBlockElement: {
        prototype: HTMLMapBlockElement;
        new (): HTMLMapBlockElement;
    };
    interface HTMLNavLinkBlockElement extends Components.NavLinkBlock, HTMLStencilElement {
    }
    var HTMLNavLinkBlockElement: {
        prototype: HTMLNavLinkBlockElement;
        new (): HTMLNavLinkBlockElement;
    };
    interface HTMLNavbarBlockElement extends Components.NavbarBlock, HTMLStencilElement {
    }
    var HTMLNavbarBlockElement: {
        prototype: HTMLNavbarBlockElement;
        new (): HTMLNavbarBlockElement;
    };
    interface HTMLSubHeaderBlockElement extends Components.SubHeaderBlock, HTMLStencilElement {
    }
    var HTMLSubHeaderBlockElement: {
        prototype: HTMLSubHeaderBlockElement;
        new (): HTMLSubHeaderBlockElement;
    };
    interface HTMLElementTagNameMap {
        "admin-page": HTMLAdminPageElement;
        "app-root": HTMLAppRootElement;
        "banner-block": HTMLBannerBlockElement;
        "business-card-block": HTMLBusinessCardBlockElement;
        "business-page": HTMLBusinessPageElement;
        "category-page": HTMLCategoryPageElement;
        "contact-page": HTMLContactPageElement;
        "content-bg-block": HTMLContentBgBlockElement;
        "content-block": HTMLContentBlockElement;
        "field-block": HTMLFieldBlockElement;
        "footer-block": HTMLFooterBlockElement;
        "header-block": HTMLHeaderBlockElement;
        "home-page": HTMLHomePageElement;
        "map-block": HTMLMapBlockElement;
        "nav-link-block": HTMLNavLinkBlockElement;
        "navbar-block": HTMLNavbarBlockElement;
        "sub-header-block": HTMLSubHeaderBlockElement;
    }
}
declare namespace LocalJSX {
    interface AdminPage {
        "db"?: MainDb;
    }
    interface AppRoot {
    }
    interface BannerBlock {
    }
    interface BusinessCardBlock {
        "buttonText"?: string;
        "description"?: string;
        "href"?: string;
        "icon"?: string;
        "name"?: string;
    }
    interface BusinessPage {
        "category"?: string;
        "db"?: MainDb;
        "slug"?: string;
    }
    interface CategoryPage {
        "category"?: string;
        "db"?: MainDb;
    }
    interface ContactPage {
    }
    interface ContentBgBlock {
    }
    interface ContentBlock {
    }
    interface FieldBlock {
        "iconSize"?: string;
        "isLink"?: boolean;
        "loading"?: boolean;
        "onValueChanged"?: (event: CustomEvent<string>) => void;
        "readOnly"?: boolean;
        "value"?: string;
    }
    interface FooterBlock {
        "instagram"?: string;
        "twitter"?: string;
        "youtube"?: string;
    }
    interface HeaderBlock {
    }
    interface HomePage {
        "db"?: MainDb;
    }
    interface MapBlock {
        "latitude"?: number;
        "longitude"?: number;
        "zoom"?: number;
    }
    interface NavLinkBlock {
        "current"?: boolean;
        "href"?: string;
    }
    interface NavbarBlock {
    }
    interface SubHeaderBlock {
    }
    interface IntrinsicElements {
        "admin-page": AdminPage;
        "app-root": AppRoot;
        "banner-block": BannerBlock;
        "business-card-block": BusinessCardBlock;
        "business-page": BusinessPage;
        "category-page": CategoryPage;
        "contact-page": ContactPage;
        "content-bg-block": ContentBgBlock;
        "content-block": ContentBlock;
        "field-block": FieldBlock;
        "footer-block": FooterBlock;
        "header-block": HeaderBlock;
        "home-page": HomePage;
        "map-block": MapBlock;
        "nav-link-block": NavLinkBlock;
        "navbar-block": NavbarBlock;
        "sub-header-block": SubHeaderBlock;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "admin-page": LocalJSX.AdminPage & JSXBase.HTMLAttributes<HTMLAdminPageElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "banner-block": LocalJSX.BannerBlock & JSXBase.HTMLAttributes<HTMLBannerBlockElement>;
            "business-card-block": LocalJSX.BusinessCardBlock & JSXBase.HTMLAttributes<HTMLBusinessCardBlockElement>;
            "business-page": LocalJSX.BusinessPage & JSXBase.HTMLAttributes<HTMLBusinessPageElement>;
            "category-page": LocalJSX.CategoryPage & JSXBase.HTMLAttributes<HTMLCategoryPageElement>;
            "contact-page": LocalJSX.ContactPage & JSXBase.HTMLAttributes<HTMLContactPageElement>;
            "content-bg-block": LocalJSX.ContentBgBlock & JSXBase.HTMLAttributes<HTMLContentBgBlockElement>;
            "content-block": LocalJSX.ContentBlock & JSXBase.HTMLAttributes<HTMLContentBlockElement>;
            "field-block": LocalJSX.FieldBlock & JSXBase.HTMLAttributes<HTMLFieldBlockElement>;
            "footer-block": LocalJSX.FooterBlock & JSXBase.HTMLAttributes<HTMLFooterBlockElement>;
            "header-block": LocalJSX.HeaderBlock & JSXBase.HTMLAttributes<HTMLHeaderBlockElement>;
            "home-page": LocalJSX.HomePage & JSXBase.HTMLAttributes<HTMLHomePageElement>;
            "map-block": LocalJSX.MapBlock & JSXBase.HTMLAttributes<HTMLMapBlockElement>;
            "nav-link-block": LocalJSX.NavLinkBlock & JSXBase.HTMLAttributes<HTMLNavLinkBlockElement>;
            "navbar-block": LocalJSX.NavbarBlock & JSXBase.HTMLAttributes<HTMLNavbarBlockElement>;
            "sub-header-block": LocalJSX.SubHeaderBlock & JSXBase.HTMLAttributes<HTMLSubHeaderBlockElement>;
        }
    }
}
