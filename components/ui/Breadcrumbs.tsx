"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  // useSelectedLayoutSegments,
  usePathname,
  // redirect,
  // useSelectedLayoutSegment,
} from "next/navigation";
/**
 * Takes an URL String and removes query params and hash params
 *
 * @param url - The URL string
 * @returns The transformed URL string
 * "https://example.com/path/to/page?query=value#fragment" to https://example.com/path/to/page
 */
const getPathFromUrl = (url: string): string => {
  return url.split(/[?#]/)[0];
};

/**
 * Takes a breadcrumb title (from url path) and replaces
 * special chars to more readable chars
 *
 * @param title - The breadcrumb title
 * @returns The transformed title or the result of the custom transformLabel function
 *
 */
const convertBreadcrumb = (
  title: string,
  toUpperCase: boolean | undefined,
  replaceCharacterList: Array<CharacterMap> | undefined,
  // transformLabel?: ((title: string) => React.ReactNode) | undefined
): React.ReactNode => {
  let transformedTitle = getPathFromUrl(title);

  // if (transformLabel) {
  //     return transformLabel(transformedTitle);
  // }

  if (replaceCharacterList) {
    for (let i = 0; i < replaceCharacterList.length; i++) {
      transformedTitle = transformedTitle.replaceAll(
        replaceCharacterList[i].from,
        replaceCharacterList[i].to,
      );
    }
  }

  // decode for utf-8 characters and return ascii.
  return toUpperCase
    ? decodeURI(transformedTitle).toUpperCase()
    : decodeURI(transformedTitle);
};

export interface Breadcrumb {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string;

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string;
}

export interface CharacterMap {
  /** The source character or character pattern that should be replaced (e.g. 'ae') */
  from: string;

  /** The replacement into which the character should be replaced. */
  to: string;
}

export interface BreadcrumbsProps {
  /** If true, the default styles are used.
   * Make sure to import the CSS in _app.js
   * Example: true Default: false */
  useDefaultStyle?: boolean;

  /** The title for the very first breadcrumb pointing to the root directory. Example: '/' Default: 'HOME' */
  rootLabel?: string | null;

  /** Boolean indicator whether the root label should be omitted. Example: true Default: false */
  omitRootLabel?: boolean;

  /** Boolean indicator if the labels should be displayed as uppercase. Example: true Default: false */
  labelsToUppercase?: boolean | undefined;

  /** Array containing a list of specific characters that should be replaced in the label. This can be useful to convert special characters such as vowels. Example: [{ from: 'ae', to: 'ä' }, { from: '-', to: ' '}] Default: [{ from: '-', to: ' ' }] */
  replaceCharacterList?: Array<CharacterMap> | undefined;

  /** A transformation function that allows to customize the label strings. Receives the label string and has to return a string or React Component */
  // transformLabel?: ((title: string) => React.ReactNode) | undefined;

  /** Array containing all the indexes of the path that should be omitted and not be rendered as labels. If we have a path like '/home/category/1' then you might want to pass '[2]' here, which omits the breadcrumb label '1'. Indexes start with 0. Example: [2] Default: undefined */
  omitIndexList?: Array<number> | undefined;

  /** An inline style object for the outer container */
  containerStyle?: any | null;

  /** Classes to be used for the outer container. Won't be used if useDefaultStyle is true */
  containerClassName?: string;

  /** An inline style object for the breadcrumb list */
  listStyle?: any | null;

  /** Classes to be used for the breadcrumb list */
  listClassName?: string;

  /** An inline style object for the inactive breadcrumb list item */
  inactiveItemStyle?: any | null;

  /** Classes to be used for the inactive breadcrumb list item */
  inactiveItemClassName?: string;

  /** An inline style object for the active breadcrumb list item */
  activeItemStyle?: any | null;

  /** Classes to be used for the active breadcrumb list item */
  activeItemClassName?: string;

  separator?: string;
}

/**
 * A functional React component for Next.js that renders a dynamic Breadcrumb navigation
 * based on the current path within the Next.js router navigation.
 *
 * Only works in conjunction with Next.js, since it leverages the Next.js router.
 *
 * By setting useDefaultStyle to true, the default CSS will be used.
 * The component is highly customizable by either custom classes or
 * inline styles, which can be passed as props.
 *
 * @param props - object of type BreadcrumbsProps
 * @returns The breadcrumb React component.
 */

const Breadcrumbs = ({
  useDefaultStyle = false,
  rootLabel = "Home",
  omitRootLabel = false,
  labelsToUppercase = false,
  replaceCharacterList = [
    { from: "-", to: " " },
    { from: "_", to: " " },
  ],

  // transformLabel = undefined,
  omitIndexList = undefined,
  containerStyle = null,
  containerClassName = "",
  listStyle = null,
  listClassName = "",
  inactiveItemStyle = null,
  inactiveItemClassName = "",
  activeItemStyle = null,
  activeItemClassName = "",
  separator = "",
}: BreadcrumbsProps) => {
  const router = usePathname();

  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(
    null,
  );

  useEffect(() => {
    if (router) {
      const linkPath = router.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      style={containerStyle}
      className={containerClassName}
      aria-label="breadcrumbs"
    >
      <ol
        style={listStyle}
        className={useDefaultStyle ? "_2jvtI" : listClassName}
      >
        {!omitRootLabel && (
          <li style={inactiveItemStyle} className={`${inactiveItemClassName} `}>
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-gray-700"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                  clipRule="evenodd"
                />
              </svg>
              {convertBreadcrumb(
                rootLabel || "Home",
                labelsToUppercase,
                replaceCharacterList,
                // transformLabel
              )}
            </Link>
          </li>
        )}

        {breadcrumbs.length >= 1 &&
          breadcrumbs.map((breadcrumb, i) => {
            if (
              !breadcrumb ||
              breadcrumb.breadcrumb.length === 0 ||
              (omitIndexList && omitIndexList.find((value) => value === i))
            ) {
              return null;
            }
            return (
              <React.Fragment key={`breadcrumb-${i}`}>
                <span>{separator}</span>
                <li
                  className={
                    i === breadcrumbs.length - 1
                      ? activeItemClassName
                      : inactiveItemClassName
                  }
                  style={
                    i === breadcrumbs.length - 1
                      ? activeItemStyle
                      : inactiveItemStyle
                  }
                >
                  <Link href={breadcrumb.href}>
                    {convertBreadcrumb(
                      breadcrumb.breadcrumb,
                      labelsToUppercase,
                      replaceCharacterList,
                    )}
                  </Link>
                </li>
              </React.Fragment>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
