import {Link} from '@shopify/hydrogen';

/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer({collection, product}) {
  return (
    <footer role="contentinfo">
      <div className="relative bg-white border-t border-b border-black border-opacity-5">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <ul className="mt-8 space-y-4">

              <li className="text-sm font-medium text-gray-600 hover:text-gray-900">
                <a
                  href="https://discord.gg/syGXvgGv"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    className="fill-current text-gray-600 mr-3"
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.3103 1.67597C19.691 0.893476 17.9595 0.324791 16.1494 0.000976562C15.9271 0.416095 15.6673 0.974439 15.4883 1.4186C13.564 1.11972 11.6574 1.11972 9.76855 1.4186C9.58952 0.974439 9.3239 0.416095 9.0996 0.000976562C7.28746 0.324791 5.55403 0.895566 3.93472 1.68012C0.668559 6.77767 -0.216844 11.7486 0.225859 16.649C2.39215 18.3198 4.49155 19.3348 6.55551 19.9989C7.06512 19.2745 7.51962 18.5045 7.91116 17.693C7.16546 17.4003 6.45123 17.0392 5.77638 16.6199C5.95541 16.4829 6.13054 16.3397 6.29973 16.1923C10.4159 18.1807 14.8882 18.1807 18.9551 16.1923C19.1263 16.3397 19.3014 16.4829 19.4785 16.6199C18.8016 17.0412 18.0855 17.4024 17.3398 17.6951C17.7313 18.5045 18.1838 19.2766 18.6954 20.001C20.7614 19.3368 22.8627 18.3219 25.029 16.649C25.5484 10.9682 24.1416 6.04292 21.3103 1.67597ZM8.47192 13.6353C7.2363 13.6353 6.22299 12.4439 6.22299 10.9931C6.22299 9.5423 7.21466 8.34886 8.47192 8.34886C9.72922 8.34886 10.7425 9.54021 10.7209 10.9931C10.7228 12.4439 9.72922 13.6353 8.47192 13.6353ZM16.7829 13.6353C15.5473 13.6353 14.534 12.4439 14.534 10.9931C14.534 9.5423 15.5256 8.34886 16.7829 8.34886C18.0402 8.34886 19.0535 9.54021 19.0319 10.9931C19.0319 12.4439 18.0402 13.6353 16.7829 13.6353Z" />
                  </svg>
                  Discord
                </a>
              </li>
            </ul>
          </div>
        
        </div>
      </div>
      <div className="py-6 px-4 md:px-8 bg-gray-50">
        <p className="text-gray-600">© {new Date().getFullYear()} dripped.</p>
      </div>
    </footer>
  );
}
