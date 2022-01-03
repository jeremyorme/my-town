/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { BusinessEntryId } from "./state/root";
export namespace Components {
    interface AdminPage {
        "directoryId": string;
        "directoryRoot": string;
    }
    interface AppRoot {
    }
    interface BannerBlock {
        "baseUrl": string;
        "townName": string;
    }
    interface BusinessCardBlock {
        "businessEntryId": BusinessEntryId;
        "buttonText": string;
        "canWrite": boolean;
        "description": string;
        "href": string;
        "icon": string;
        "name": string;
        "slug": string;
    }
    interface BusinessPage {
        "businessIdx": number;
        "businessesId": string;
        "category": string;
        "directoryId": string;
        "directoryRoot": string;
        "slug": string;
    }
    interface CategoryPage {
        "category": string;
        "directoryId": string;
        "directoryRoot": string;
    }
    interface ContactPage {
        "directoryId": string;
        "directoryRoot": string;
    }
    interface ContentBgBlock {
    }
    interface ContentBlock {
    }
    interface DirectoryPage {
        "directoryId": string;
        "directoryRoot": string;
    }
    interface FieldBlock {
        "iconSize": string;
        "isLink": boolean;
        "loading": boolean;
        "readOnly": boolean;
        "value": string;
    }
    interface FooterBlock {
        "baseUrl": string;
        "directoryId": string;
        "instagram": string;
        "twitter": string;
        "youtube": string;
    }
    interface HeaderBlock {
    }
    interface HomePage {
    }
    interface MapBlock {
        "latitude": number;
        "longitude": number;
        "zoom": number;
    }
    interface MyBusinessesPage {
    }
    interface NavLinkBlock {
        "current": boolean;
        "href": string;
    }
    interface NavbarBlock {
    }
    interface SubHeaderBlock {
    }
    interface TabLinkBlock {
    }
    interface TabMenuBlock {
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
    interface HTMLDirectoryPageElement extends Components.DirectoryPage, HTMLStencilElement {
    }
    var HTMLDirectoryPageElement: {
        prototype: HTMLDirectoryPageElement;
        new (): HTMLDirectoryPageElement;
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
    interface HTMLMyBusinessesPageElement extends Components.MyBusinessesPage, HTMLStencilElement {
    }
    var HTMLMyBusinessesPageElement: {
        prototype: HTMLMyBusinessesPageElement;
        new (): HTMLMyBusinessesPageElement;
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
    interface HTMLTabLinkBlockElement extends Components.TabLinkBlock, HTMLStencilElement {
    }
    var HTMLTabLinkBlockElement: {
        prototype: HTMLTabLinkBlockElement;
        new (): HTMLTabLinkBlockElement;
    };
    interface HTMLTabMenuBlockElement extends Components.TabMenuBlock, HTMLStencilElement {
    }
    var HTMLTabMenuBlockElement: {
        prototype: HTMLTabMenuBlockElement;
        new (): HTMLTabMenuBlockElement;
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
        "directory-page": HTMLDirectoryPageElement;
        "field-block": HTMLFieldBlockElement;
        "footer-block": HTMLFooterBlockElement;
        "header-block": HTMLHeaderBlockElement;
        "home-page": HTMLHomePageElement;
        "map-block": HTMLMapBlockElement;
        "my-businesses-page": HTMLMyBusinessesPageElement;
        "nav-link-block": HTMLNavLinkBlockElement;
        "navbar-block": HTMLNavbarBlockElement;
        "sub-header-block": HTMLSubHeaderBlockElement;
        "tab-link-block": HTMLTabLinkBlockElement;
        "tab-menu-block": HTMLTabMenuBlockElement;
    }
}
declare namespace LocalJSX {
    interface AdminPage {
        "directoryId"?: string;
        "directoryRoot"?: string;
    }
    interface AppRoot {
    }
    interface BannerBlock {
        "baseUrl"?: string;
        "townName"?: string;
    }
    interface BusinessCardBlock {
        "businessEntryId"?: BusinessEntryId;
        "buttonText"?: string;
        "canWrite"?: boolean;
        "description"?: string;
        "href"?: string;
        "icon"?: string;
        "name"?: string;
        "onButtonClicked"?: (event: CustomEvent<void>) => void;
        "onDeleteClicked"?: (event: CustomEvent<void>) => void;
        "onIdChanged"?: (event: CustomEvent<BusinessEntryId>) => void;
        "onSlugChanged"?: (event: CustomEvent<string>) => void;
        "slug"?: string;
    }
    interface BusinessPage {
        "businessIdx"?: number;
        "businessesId"?: string;
        "category"?: string;
        "directoryId"?: string;
        "directoryRoot"?: string;
        "slug"?: string;
    }
    interface CategoryPage {
        "category"?: string;
        "directoryId"?: string;
        "directoryRoot"?: string;
    }
    interface ContactPage {
        "directoryId"?: string;
        "directoryRoot"?: string;
    }
    interface ContentBgBlock {
    }
    interface ContentBlock {
    }
    interface DirectoryPage {
        "directoryId"?: string;
        "directoryRoot"?: string;
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
        "baseUrl"?: string;
        "directoryId"?: string;
        "instagram"?: string;
        "twitter"?: string;
        "youtube"?: string;
    }
    interface HeaderBlock {
    }
    interface HomePage {
    }
    interface MapBlock {
        "latitude"?: number;
        "longitude"?: number;
        "zoom"?: number;
    }
    interface MyBusinessesPage {
    }
    interface NavLinkBlock {
        "current"?: boolean;
        "href"?: string;
    }
    interface NavbarBlock {
    }
    interface SubHeaderBlock {
    }
    interface TabLinkBlock {
    }
    interface TabMenuBlock {
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
        "directory-page": DirectoryPage;
        "field-block": FieldBlock;
        "footer-block": FooterBlock;
        "header-block": HeaderBlock;
        "home-page": HomePage;
        "map-block": MapBlock;
        "my-businesses-page": MyBusinessesPage;
        "nav-link-block": NavLinkBlock;
        "navbar-block": NavbarBlock;
        "sub-header-block": SubHeaderBlock;
        "tab-link-block": TabLinkBlock;
        "tab-menu-block": TabMenuBlock;
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
            "directory-page": LocalJSX.DirectoryPage & JSXBase.HTMLAttributes<HTMLDirectoryPageElement>;
            "field-block": LocalJSX.FieldBlock & JSXBase.HTMLAttributes<HTMLFieldBlockElement>;
            "footer-block": LocalJSX.FooterBlock & JSXBase.HTMLAttributes<HTMLFooterBlockElement>;
            "header-block": LocalJSX.HeaderBlock & JSXBase.HTMLAttributes<HTMLHeaderBlockElement>;
            "home-page": LocalJSX.HomePage & JSXBase.HTMLAttributes<HTMLHomePageElement>;
            "map-block": LocalJSX.MapBlock & JSXBase.HTMLAttributes<HTMLMapBlockElement>;
            "my-businesses-page": LocalJSX.MyBusinessesPage & JSXBase.HTMLAttributes<HTMLMyBusinessesPageElement>;
            "nav-link-block": LocalJSX.NavLinkBlock & JSXBase.HTMLAttributes<HTMLNavLinkBlockElement>;
            "navbar-block": LocalJSX.NavbarBlock & JSXBase.HTMLAttributes<HTMLNavbarBlockElement>;
            "sub-header-block": LocalJSX.SubHeaderBlock & JSXBase.HTMLAttributes<HTMLSubHeaderBlockElement>;
            "tab-link-block": LocalJSX.TabLinkBlock & JSXBase.HTMLAttributes<HTMLTabLinkBlockElement>;
            "tab-menu-block": LocalJSX.TabMenuBlock & JSXBase.HTMLAttributes<HTMLTabMenuBlockElement>;
        }
    }
}
