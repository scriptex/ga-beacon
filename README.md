# GA Beacon [![Analytics](https://ga-beacon.atanas.info/api/analytics?account=UA-83446952-1&page=github.com/scriptex/ga-beacon&pixel)](https://github.com/scriptex/ga-beacon/)

> Use Google Analytics where it is usually not possible

**This project was inspired by [GA Beacon](https://github.com/igrigorik/ga-beacon).**

Sometimes it is impossible to embed the Javascript tracking code provided by Google Analytics: the host page does not allow arbitrary JavaScript, and there is no Google Analytics integration. However, not all is lost! **If you can embed a simple image (pixel tracker), then you can beacon data to Google Analytics.** For a great, hands-on explanation of how this works, check out the following guides:

-   [Using a Beacon Image for GitHub, Website and Email Analytics](http://www.sitepoint.com/using-beacon-image-github-website-email-analytics/)
    (also see FAQ below regarding GitHub)
-   [Tracking Google Sheet views with Google Analytics using GA Beacon](http://mashe.hawksey.info/2014/02/tracking-google-sheet-views-with-google-analytics/)

## Can I use this production?

The ga-beacon.atanas.info instance is a **demo** instance, good for prototyping and proof of concepts. If you intend to use this in production for your application, you should deploy **your own instance** of this service, which will allow you to scale the service up and down to meet your capacity needs, introspect the logs, customize the code, and so on.

Deploying your own instance is trivial - just press the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fscriptex%2Fga-beacon&project-name=ga-beacon&repository-name=ga-beacon)

## Visitor stats

![GitHub stars](https://img.shields.io/github/stars/scriptex/ga-beacon?style=social)
![GitHub forks](https://img.shields.io/github/forks/scriptex/ga-beacon?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/scriptex/ga-beacon?style=social)
![GitHub followers](https://img.shields.io/github/followers/scriptex?style=social)

## Code stats

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/scriptex/ga-beacon)
![GitHub repo size](https://img.shields.io/github/repo-size/scriptex/ga-beacon?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/scriptex/ga-beacon?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/scriptex/ga-beacon?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/ga-beacon?style=plastic)

### FAQ

**How does this work?**

Google Analytics provides a [measurement protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide) which allows us to POST arbitrary visit data directly to Google servers, and that's exactly what GA Beacon does: we include an image request on our pages which hits the GA Beacon service, and GA Beacon POSTs the visit data to Google Analytics to record the visit. As a result, if you can embed an image, you can beacon data to Google Analytics.

**Why do we need to proxy?**

Google Analytics supports reporting of visit data [via GET requests](https://developers.google.com/analytics/devguides/collection/protocol/v1/reference#transport), but unfortunately we can't use that directly because we need to generate and report a unique visitor ID for each hit - e.g. some pages do not allow us to run JS on the client to generate the ID. To address this, we proxy the request through ga-beacon.atanas.info, which in turn is responsible for generating the unique visitor ID (server generated UUID), setting the appropriate cookies for repeat hits, and reporting the hits to Google Analytics.

**What about referrals and other visitor information?**

Unfortunately the static tracking pixel approach limits the information we can collect about the visit. For example, referral information can't be passed to the tracking pixel because we can't execute JavaScript. As a result, the available metrics are restricted to unique visitors, pageviews, and the User-Agent and IP address of the visitor.

**Do I have to use ga-beacon.atanas.info?**

You can if you want to - it's free, but there are no capacity or availability promises. For best results, deploy your own instance directly on Google App Engine: clone this repository, change the project name, and deploy your own instance - easy as that. The project is under MIT license.

## Usage

GA Beacon is a serverless Node JS function deployed and running on Vercel's network. It can be found [here](https://ga-beacon.atanas.info/api/analytics).

In order to capture a `pageview` event in Google Analytics, several required arguments need to be passed:

1. Google Analytics ID (`account`) - usually starts with `UA-` and is followed by a series of numbers.
2. Page: (`page`) - the page to be captured.
3. Pixel (`pixel`) - Optional boolean argument which tells the module to return a blank 1x1 pixel SVG image
4. Flat (`flat`) - Optional boolean argument which tells the module to return a flat SVG badge image

If either of the `flat` and `pixel` optional arguments is missing, the module will return the default SVG badge image.

## Examples

### Example URL

The URL below sends pageview event for the "github.com/scriptex/ga-beacon" to Google Analytics for the "UA-83446952-1" ID and returns an embeddable SVG image - blank 1x1 pixel SVG image.

```txt
https://ga-beacon.atanas.info/api/analytics
?account=UA-83446952-1
&page=github.com/scriptex/ga-beacon
&pixel
```

### Example tracker markup (in Markdown)

```markdown
[![Analytics](https://ga-beacon.atanas.info/api/analytics?account=UA-83446952-1&page=github.com/scriptex/ga-beacon&flat)](https://github.com/scriptex/ga-beacon)
```

## LICENSE

MIT

---

<div align="center">
    Connect with me:
</div>

<br />

<div align="center">
    <a href="https://atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="mailto:hi@atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://github.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://gitlab.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://twitter.com/scriptexbg">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/~scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.youtube.com/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://stackoverflow.com/users/4140082/atanas-atanasov">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://codepen.io/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg" width="20" alt="">
    </a>
    &nbsp;
    <a href="https://profile.codersrank.io/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://linktr.ee/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg" height="20" alt="">
    </a>
</div>

---

<div align="center">
Support and sponsor my work:
<br />
<br />
<a href="https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20developer%20profile%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome" title="Tweet">
	<img src="https://img.shields.io/badge/Tweet-Share_my_profile-blue.svg?logo=twitter&color=38A1F3" />
</a>
<a href="https://paypal.me/scriptex" title="Donate on Paypal">
	<img src="https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?logo=paypal&color=222d65" />
</a>
<a href="https://revolut.me/scriptex" title="Donate on Revolut">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/revolut.json" />
</a>
<a href="https://patreon.com/atanas" title="Become a Patron">
	<img src="https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?logo=patreon&color=e64413" />
</a>
<a href="https://ko-fi.com/scriptex" title="Buy Me A Coffee">
	<img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi" />
</a>
<a href="https://liberapay.com/scriptex/donate" title="Donate on Liberapay">
	<img src="https://img.shields.io/liberapay/receives/scriptex?label=Donate%20on%20Liberapay&logo=liberapay" />
</a>

<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" title="Donate Bitcoin">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" title="Donate Etherium">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" title="Donate Shiba Inu">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" />
</a>
</div>
