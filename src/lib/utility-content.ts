export type UtilityFaq = { q: string; a: string };
export type UtilityContent = {
  lastUpdated: string;
  howTo: string[];
  about: string[];
  useCases: string[];
  examples: string[];
  faqs: UtilityFaq[];
};

export const utilityContent: Record<string, UtilityContent> = {
  "image-compressor": {
    lastUpdated: "2026-11-21",
    howTo: ["Choose a JPG, PNG, or WebP image from your device.", "Set the quality level with the slider and review the selected value.", "Select Compress image and wait for the browser to finish processing.", "Download the resulting JPG and compare it with the original before sharing."],
    about: [
      "Image Compressor reduces the file size of a picture by drawing it into your browser’s canvas and exporting a JPEG. The quality control changes the export setting before the output is created. This gives you a quick way to prepare a lighter image for a page, email or form without sending the selected file to a Toolix upload service.",
      "To begin, choose a supported image file from your device. The browser reads the local file, creates an image preview in memory, then draws its pixels to a canvas. When you run compression, the canvas produces a new image file. The page offers a quality slider so you can choose a setting that balances visual detail with the file you plan to download.",
      "Compression is useful when an image is larger than a destination’s upload limit or takes longer than expected to attach. It can also help when preparing a group of photographs for a simple web page. The result depends on the original image, its dimensions, browser support and the selected quality. The tool does not promise a particular percentage reduction or identical output across browsers.",
      "The current export is JPEG, including when the original file is a PNG or WebP. JPEG does not preserve transparent backgrounds, and repeated JPEG exports can reduce detail. Keep the original if you may need transparency or want to make another edit. Review the downloaded file at its intended display size before replacing an original or sending it to someone else.",
      "Processing happens in the browser, and the page creates a download for you to save locally. Toolix does not receive the image through this interface. The browser may use memory while the image is open, so very large files can take longer or exceed a device’s available resources. For important images, keep a backup and compare the output before use."
    ],
    useCases: ["Preparing a photo for an email attachment.", "Reducing an image before adding it to a web page.", "Trying a lower file size for an upload form.", "Creating a separate shareable copy while keeping the source file."],
    examples: ["Choose a photo, adjust quality, compress it, then compare the downloaded JPEG with the original at the size people will see it."],
    faqs: [
      { q: "Which image formats can I select?", a: "The file picker accepts JPG, PNG and WebP images. The exported result is a JPEG file." },
      { q: "Does compression happen on Toolix servers?", a: "No. The selected image is read and processed in your browser; the tool interface does not upload it to Toolix." },
      { q: "Will the compressed file always be smaller?", a: "Not necessarily. The result depends on the source image and quality setting. Compare the downloaded file size with the original." },
      { q: "Will transparency be preserved?", a: "No. The current export is JPEG, which does not retain a transparent background. Keep the original if transparency matters." },
      { q: "Why does the result look different?", a: "JPEG export can change fine detail and colour transitions. Try a higher quality setting and review the image before using it." }
    ]
  },
  "image-resizer": {
    lastUpdated: "2026-11-21",
    howTo: ["Choose a JPG, PNG, or WebP image.", "Enter the maximum width and height you want in pixels.", "Leave Keep aspect ratio selected to fit the image inside those dimensions proportionally, or turn it off to set both dimensions independently.", "Select Resize image and download the resulting JPEG."],
    about: [
      "Image Resizer creates a new image at dimensions you choose. It loads the selected picture in the browser, draws it onto a canvas and exports the canvas as a JPEG. You can set width and height in pixels and choose whether the original proportions should be retained. The source file remains on your device while the browser performs the conversion.",
      "With Keep aspect ratio selected, the tool scales the source image to fit within the width and height values you enter. The output keeps the picture’s proportions, so its final width or height can be smaller than one of the requested limits. Turn that option off only when you specifically want the output to use both exact dimensions and accept that the picture may look stretched.",
      "Resizing is helpful when a site, presentation or document needs an image at a predictable size. It can also create a smaller copy for a profile, thumbnail or message. The page limits each dimension to the range supported by its controls. A very large image still takes device memory during processing, and changing dimensions cannot recover detail that was absent from the original.",
      "The output is JPEG regardless of whether the selected image started as JPG, PNG or WebP. Transparent areas therefore will not remain transparent. JPEG export can also affect fine edges and text inside a graphic. If you need transparency or lossless output, preserve the original and use a workflow designed for that format.",
      "After downloading, check the file’s dimensions and look at it at its intended display size. If it appears distorted, restore Keep aspect ratio and resize again. If it looks soft, the requested dimensions may be larger than the source or the browser’s JPEG export may have altered detail. Keep an untouched copy until you are sure the resized image works."
    ],
    useCases: ["Fitting a picture inside a page’s maximum dimensions.", "Making a smaller image for a profile or thumbnail.", "Creating an exact-size image where distortion is acceptable.", "Preparing a separate image copy for a presentation."],
    examples: ["Enter a width and height as the bounds for a picture, keep its proportions, then confirm the downloaded dimensions before placing it."],
    faqs: [
      { q: "What do width and height mean?", a: "They are pixel dimensions used as the output bounds. With Keep aspect ratio enabled, the image fits inside those bounds." },
      { q: "Why is the result smaller than one dimension I entered?", a: "When aspect ratio is kept, the tool fits the image inside both dimensions; one side can end up below its maximum." },
      { q: "Can I make the output exactly the width and height entered?", a: "Yes. Turn off Keep aspect ratio. The image may be stretched if the requested proportions differ from the source." },
      { q: "Does the result preserve transparency?", a: "No. The tool exports JPEG. Keep the original image when a transparent background is needed." },
      { q: "Where is the image processed?", a: "The image is loaded and resized in your browser. The tool interface does not upload it to Toolix." }
    ]
  },
  "jpg-to-png": {
    lastUpdated: "2026-11-21",
    howTo: ["Choose an image file from your device.", "Check that the selected filename is the image you intend to convert.", "Select Convert image and let the browser export a PNG.", "Download the result and open it in your usual image viewer to check it."],
    about: [
      "JPG to PNG Converter creates a PNG copy of an image using your browser. The tool loads the chosen file, draws it to a canvas and exports that canvas as PNG. The conversion takes place in the browser interface, so you can make the new file without uploading the image through Toolix.",
      "PNG and JPEG store image information differently. PNG is often chosen when a workflow needs lossless-style image data or transparency support; converting a JPEG to PNG does not restore detail that was removed when the JPEG was first made. The result may have a larger file size than the original, so check whether PNG is the format your destination actually requires.",
      "This converter is useful when an application requests PNG, when you need a consistent output format, or when you want a PNG copy to use in another editing step. The current tool exports to PNG, but it does not provide advanced controls for cropping, colour correction or layer editing. Those tasks should be done in an image editor.",
      "The file picker accepts common browser-readable image files. Although the tool is named for JPG conversion, the canvas can export other selected images as PNG as well. Always confirm the filename and open the downloaded file to ensure the format and appearance meet the needs of your next step.",
      "Image conversion uses browser memory while the source and output are being handled. Large images may take longer on a device with limited resources. Keep the original file until you have checked the PNG. If the destination has a strict upload-size limit, compare the file sizes because PNG output is not guaranteed to be smaller than JPG."
    ],
    useCases: ["Providing a PNG where an upload form requests that format.", "Making a separate PNG copy before further image editing.", "Standardising mixed image files for a small project.", "Checking how an image behaves in a PNG-only workflow."],
    examples: ["Select an image, convert it, then verify the downloaded filename and open the PNG before attaching it to the destination."],
    faqs: [
      { q: "Does converting JPG to PNG restore lost image detail?", a: "No. Conversion changes the output format; it cannot restore detail already lost in the source JPEG." },
      { q: "Will the PNG be smaller than the JPG?", a: "Not necessarily. Compare the output size with your original and check any upload limit." },
      { q: "Can I convert a PNG or WebP too?", a: "The browser image workflow can export a selected supported image as PNG, although the tool is presented as a JPG to PNG converter." },
      { q: "Is the image uploaded?", a: "No. The browser loads and converts the image locally; the tool interface does not send it to Toolix." },
      { q: "Does this tool edit or crop an image?", a: "No. It converts the selected image format. Use a separate image editor for cropping, layers or detailed adjustments." }
    ]
  },
  "webp-converter": {
    lastUpdated: "2026-11-21",
    howTo: ["Choose a supported image from your device.", "Select Convert image to export a WebP copy.", "Wait for the browser to finish converting the image.", "Download the WebP file and confirm that the site or application you need accepts it."],
    about: [
      "WebP Converter exports a selected image as a WebP file in your browser. The interface loads the source image, draws it to a canvas and asks the browser to create WebP output. The converted copy is then offered as a download. Your selected file is not uploaded to Toolix through this tool.",
      "WebP is an image format used on the web. A conversion can be useful when a website workflow asks for WebP or when you want to test that format in a page. The output depends on the browser’s canvas implementation and the source image. Converting a file does not guarantee a smaller result, so compare sizes before replacing an existing asset.",
      "Choose an image that your browser can open, run the conversion and save the result with its generated filename. If you are preparing an image for a website, verify that your content system accepts WebP and that the image displays on the devices and browsers your audience uses. Keep the original in case you need another format or a different quality setting later.",
      "This tool focuses on format conversion. It does not provide cropping, colour adjustments or a format-selection menu; WebP is the output. The browser handles the image in memory, which means very large files can take longer or use substantial device resources. Try a smaller image if conversion fails, and check the result before publishing it.",
      "A converted file should be treated as a new copy, not as a replacement until it has been reviewed. Confirm its file extension, dimensions and appearance. If the destination requires a different format or preserves transparent areas in a particular way, verify the output there before you depend on it."
    ],
    useCases: ["Preparing an image for a WebP-enabled website.", "Creating a WebP copy while keeping the source file.", "Checking whether a content system accepts WebP uploads.", "Comparing converted image size before publishing."],
    examples: ["Convert one image, then open the downloaded WebP locally and test it in the page or content system where it will be used."],
    faqs: [
      { q: "What format does the tool create?", a: "The output format is WebP." },
      { q: "Does conversion always reduce file size?", a: "No. Results depend on the source and browser encoder. Compare the downloaded size with the original." },
      { q: "Can I choose compression quality?", a: "This converter currently exports WebP without a separate quality control." },
      { q: "Are my files sent to a server?", a: "No. The image is handled by your browser and is not uploaded through the Toolix tool interface." },
      { q: "What if my website does not accept WebP?", a: "Keep the source image and use a format supported by that site or application." }
    ]
  },
  "word-counter": {
    lastUpdated: "2026-11-21",
    howTo: ["Paste or type text in the box.", "Read the word, character, no-space character, sentence and paragraph totals.", "Check the estimated reading time if you are preparing a passage for readers.", "Edit the text and use the updated counts as you work."],
    about: [
      "Word Counter reports several basic measurements for text as you type or paste it into the editor. It shows words, total characters, characters without whitespace, sentences, paragraphs and an estimated reading time. The calculation runs in the browser, and the text is not submitted to Toolix through this tool interface.",
      "Counts can help when preparing a short description, an assignment with a word limit, a message or an article draft. Character totals are useful for fields with length constraints, while paragraph and sentence counts offer a quick overview of how a passage is structured. Reading time is an estimate, not a promise about how long a particular reader will take.",
      "The tool applies simple text rules. Words are separated by whitespace; sentences are estimated from punctuation marks; paragraphs are counted from non-empty groups of lines. Different writing systems, abbreviations, web addresses, emoji and unusual punctuation can be interpreted differently by other editors or publishing systems. Treat the displayed totals as a practical estimate and check the target platform’s own counter when its limit is strict.",
      "To use the result, paste the exact text you plan to submit or publish. Formatting that is not included in the text box, such as a document title or footnotes, will not be counted. Make edits in the box and watch the totals update. You can select and copy the text from the browser when you are finished.",
      "Because counting is local to the page, the text stays in the current browser session rather than being sent to an upload endpoint. Avoid entering confidential or sensitive information into any online tool. If you leave or refresh the page, the text may not be saved, so copy important work to your own document."
    ],
    useCases: ["Checking an essay or article against a word limit.", "Reviewing character length before filling a form.", "Estimating the size of a draft or message.", "Getting a quick structural count of sentences and paragraphs."],
    examples: ["Paste a draft, adjust it until it fits the target’s word or character limit, then verify against the destination’s own counter."],
    faqs: [
      { q: "How does the tool count words?", a: "It splits the entered text on whitespace. Other editors may treat punctuation and special characters differently." },
      { q: "How is reading time estimated?", a: "The display uses a simple words-per-minute estimate. Actual reading speed varies by person and material." },
      { q: "Does it count text in a document I have not pasted?", a: "No. Only text present in the input box is counted." },
      { q: "Is my text stored or uploaded?", a: "The count is calculated in your browser. The tool interface does not upload your text to Toolix." },
      { q: "Why does another website show a different number?", a: "Different services may count punctuation, hyphenated terms, emoji or line breaks using different rules." }
    ]
  },
  "case-converter": {
    lastUpdated: "2026-11-21",
    howTo: ["Type or paste text into the input area.", "Choose UPPERCASE, lowercase, Title Case or Sentence case.", "Review the output shown below the controls.", "Copy the converted result when it looks right."],
    about: [
      "Case Converter changes the letter casing of text in your browser. Enter a passage, choose one of the available modes and review the generated output. The page keeps the original input separate from the converted result, so you can switch modes and compare without retyping the source text.",
      "UPPERCASE changes letters to capitals, while lowercase changes letters to their lowercase forms. Title Case capitalises the first letter of words according to the tool’s simple word-based rule. Sentence case makes the first character of the entered passage uppercase and converts the remaining characters to lowercase. These automatic rules are convenient for plain text, but they do not understand every editorial convention.",
      "Names, acronyms, product labels and languages with special casing rules may need manual review. For example, an acronym that should remain all capitals can be changed when you select lowercase or sentence case. The converter does not preserve deliberate emphasis or determine which words should remain capitalised in a heading. Check the result before using it in published or formal writing.",
      "This tool is useful for cleaning pasted text, preparing a heading, standardising a list or correcting accidental caps lock. It only changes letter casing; it does not proofread spelling, rewrite sentences or translate text. Punctuation and spacing remain part of the text being converted, though the mode may affect letters after punctuation according to its simple rule.",
      "The conversion happens in the current browser session. Toolix does not receive the text through this interface. Copy any output you need before leaving the page, and avoid entering sensitive material into online tools. If you are editing a long document, test a small excerpt first to confirm that the selected mode matches your preferred style."
    ],
    useCases: ["Correcting text accidentally entered with caps lock.", "Preparing a heading in a consistent case.", "Standardising a plain-text list of labels.", "Comparing alternative casing before copying text."],
    examples: ["Paste a heading, switch between Title Case and sentence case, then check brand names and acronyms before copying."],
    faqs: [
      { q: "What does Title Case do?", a: "It capitalises the first letter of words using a simple word-based conversion. Review short words and names manually." },
      { q: "Will it keep acronyms unchanged?", a: "Not necessarily. A case conversion may change acronyms, so inspect the result before using it." },
      { q: "Does Sentence case fix grammar?", a: "No. It changes letter casing only; it does not proofread or rewrite the text." },
      { q: "Can I compare different modes?", a: "Yes. Choose another mode and the output updates while your original input remains available." },
      { q: "Is my text uploaded?", a: "No. The conversion is performed in your browser and is not submitted to Toolix." }
    ]
  },
  "remove-duplicate-lines": {
    lastUpdated: "2026-11-21",
    howTo: ["Paste a list with one item on each line.", "Review the cleaned output.", "Check that repeated lines are exact duplicates you intended to remove.", "Copy the result for use in your document or workflow."],
    about: [
      "Remove Duplicate Lines cleans a plain-text list by keeping the first occurrence of each exact line and dropping later repeats. The input and result are shown separately, which lets you compare the original with the cleaned list before copying. The tool processes the text in your browser and does not submit it to a Toolix upload service.",
      "This is useful for removing repeated entries from pasted names, tags, identifiers or other line-based material. The tool preserves the order of the lines it keeps. It compares line text as entered, so differences in capitalisation or extra spaces can cause two entries to be treated as different. It does not sort the list or decide that similar-looking phrases mean the same thing.",
      "Before using the result, review the list’s structure and decide whether blank lines, case differences or whitespace should matter for your task. Exact duplicate removal is appropriate when identical lines are redundant. It may not be appropriate when repeated entries represent separate records, events or occurrences that must remain distinct.",
      "The page reports how many duplicate lines were removed by comparing the original line count with the cleaned output. This is a quick check, not a detailed audit log. If you need to preserve counts or record which line was removed, make a copy of the original or use a spreadsheet or data-cleaning workflow that records those changes.",
      "The tool is designed for text lists rather than structured data. It does not parse commas, fields or quoted values as a CSV program would. Keep a backup of important source material, paste only the content you intend to clean, and confirm that the retained first occurrence is the right one before moving it into another system."
    ],
    useCases: ["Removing repeated tags from a plain-text list.", "Cleaning duplicate entries copied from notes.", "Preparing a unique list of line-based labels.", "Checking how many exact repeated lines appeared."],
    examples: ["Paste a newline-separated list, inspect which first occurrences remain, then copy the result after confirming repeated records were safe to remove."],
    faqs: [
      { q: "Does it remove similar lines or only exact repeats?", a: "It removes exact repeated line strings. Similar wording, different case or extra spaces can remain separate." },
      { q: "Does it keep the original order?", a: "Yes. The first occurrence of each exact line is kept in its original position." },
      { q: "Will it sort the list?", a: "No. It removes repeated lines and leaves the retained items in their original order." },
      { q: "Should I use it on CSV data?", a: "It treats input as plain lines, not parsed CSV records. Use a CSV-aware tool if field structure matters." },
      { q: "Does Toolix receive my list?", a: "No. The deduplication runs in your browser; the interface does not upload the text to Toolix." }
    ]
  },
  "percentage-calculator": {
    lastUpdated: "2026-11-21",
    howTo: ["Enter the percentage in the first field.", "Enter the number in the second field.", "Read the result shown below the fields.", "Change either value to recalculate, then copy or note the result you need."],
    about: [
      "Percentage Calculator answers one focused question: what is the entered percentage of the entered number? Type a percentage and a base number, and the result updates in the browser. The tool performs the multiplication and divides by one hundred. It is intended for quick everyday arithmetic rather than a full financial, tax or statistical analysis.",
      "The same operation can describe a portion, fee, discount amount, tax amount or share of a total, as long as the percentage and base number match the question you are asking. The tool returns the calculated amount; it does not automatically add that amount to the base or subtract it. For a final price after a discount, use a discount calculator or perform the required addition or subtraction separately.",
      "Check the units before interpreting a result. A percentage of a monthly amount remains an amount in the same currency or unit, while a percentage of a count produces a numeric portion. The calculator accepts numeric values and displays a formatted result. It does not determine whether the entered values are appropriate for a particular invoice, contract or decision.",
      "The tool can help with classroom exercises, quick comparisons, budget estimates or checking arithmetic. If the result affects a payment or formal filing, independently verify the inputs and calculation. Rounding in the display can make a very small decimal difference from a spreadsheet or another calculator, so use the precision required by the task.",
      "All values are calculated in your browser; they are not sent to Toolix through this interface. The page does not save a calculation history, so write down or copy results you need. Do not treat an arithmetic result as professional advice or as a replacement for the rules that govern a specific financial transaction."
    ],
    useCases: ["Finding a portion of a quantity.", "Estimating the amount represented by a rate.", "Checking a percentage calculation from a worksheet.", "Comparing a part with a base amount."],
    examples: ["Enter 15 as the percentage and 250 as the base number; the calculator applies 15 ÷ 100 × 250."],
    faqs: [
      { q: "What calculation does this tool perform?", a: "It multiplies the number by the percentage and divides by 100." },
      { q: "Does it calculate a percentage increase or decrease?", a: "No. It calculates a percentage of a number. A change calculation needs both an original and a new value." },
      { q: "Does the result include the original number?", a: "No. The result is the percentage amount only; add or subtract it separately if that is what your task requires." },
      { q: "Why might another calculator show more decimal places?", a: "Different tools format and round displayed results differently. Check the precision needed for your use." },
      { q: "Are my values stored?", a: "The calculation is performed in your browser and the tool interface does not submit your values to Toolix." }
    ]
  },
  "age-calculator": {
    lastUpdated: "2026-11-21",
    howTo: ["Choose a date of birth.", "Choose the date on which you want to measure the age.", "Read the years, months and days shown in the result.", "Check both dates if the result is blank or unexpected."],
    about: [
      "Age Calculator measures the calendar interval between a date of birth and a second date that you select. It reports the result as years, months and days. By letting you choose the comparison date, the tool can answer questions about age on a past or future date as well as age today.",
      "The browser reads the two dates and compares their calendar components. It accounts for months with different lengths when it works out the remaining days. Calendar arithmetic is different from dividing a total number of days by a fixed number, so a result expressed in years, months and days is a calendar description rather than a decimal age.",
      "This can be useful for checking a form, preparing a simple timeline or understanding the interval between two dates. It is not an identity check and does not establish legal eligibility. Rules for age thresholds, leap-day birthdays, time zones and official records can depend on the relevant institution or jurisdiction, so use authoritative records for formal decisions.",
      "Select the birth date first, then choose the date you want to measure against. The comparison date cannot be earlier than the birth date in the page controls. If the output is blank, confirm that both inputs are valid. The result is recalculated locally in the browser when a date changes.",
      "Dates entered into this calculator remain in the page while you use it and are not submitted through a Toolix form. The tool does not retain a saved history after you leave. Avoid entering someone else’s sensitive personal details unless you have a valid reason and permission to use them."
    ],
    useCases: ["Finding age on a selected event date.", "Checking the calendar interval between a birth date and today.", "Preparing a simple personal timeline.", "Reviewing a date calculation before completing a non-official form."],
    examples: ["Select the birth date and a past event date to see the calendar age on that day, rather than today’s age."],
    faqs: [
      { q: "Can I calculate age on a past date?", a: "Yes. Choose that date in the Age on date field, as long as it is not before the birth date." },
      { q: "Why does the result use years, months and days?", a: "It expresses the interval using calendar units, whose lengths vary by month and year." },
      { q: "Does this determine legal age or eligibility?", a: "No. Official rules and records may define age calculations differently; check the relevant authority." },
      { q: "What if my date of birth is on a leap day?", a: "The tool compares calendar dates, but institutions may apply their own rules for leap-day birthdays." },
      { q: "Are the dates sent to Toolix?", a: "No. The calculation takes place in your browser and is not submitted to Toolix by the tool interface." }
    ]
  },
  "discount-calculator": {
    lastUpdated: "2026-11-21",
    howTo: ["Enter the original price.", "Enter the discount percentage.", "Review the amount saved and the resulting price.", "Confirm whether tax, shipping or other charges need to be considered separately."],
    about: [
      "Discount Calculator estimates the amount removed from an original price by a percentage discount and shows the resulting price. Enter the two values and review both the saving and the price after the discount. The arithmetic is performed in the browser and is intended to make a simple price calculation easier to check.",
      "A percentage discount is applied to the original price. The discount amount is the original price multiplied by the percentage and divided by one hundred. The resulting price is the original price minus that discount amount. This calculation does not determine whether a sale is genuine, whether a shop’s terms allow the offer or whether taxes and fees are included in the displayed base price.",
      "Use the calculator to compare a listed offer, check a planned markdown or estimate a reduced price before a purchase. Enter the same currency unit for the original amount and interpret the result in that unit. The calculator does not convert currencies, add tax, apply coupons in sequence or account for a minimum/maximum discount unless those details are part of the number you enter.",
      "For multiple discounts, do not assume that separate percentages add together. The order and base for each discount can change the outcome. Enter the effective discount and base amount if you already know them, or calculate each step separately according to the seller’s terms. Review the checkout total because shipping, tax and fees may be handled outside the displayed item price.",
      "This is a basic arithmetic aid rather than a quote or offer. Verify important prices with the seller and check the final amount before paying. The values are not saved by Toolix through this interface; the calculation remains in the current browser page, so record the result yourself if you need it later."
    ],
    useCases: ["Checking a sale price before checkout.", "Estimating the saving from a listed percentage offer.", "Comparing simple markdowns on different prices.", "Reviewing a planned price reduction."],
    examples: ["Enter the listed price and the discount rate, then compare the displayed reduction and resulting price with the seller’s checkout."],
    faqs: [
      { q: "Does the result include tax or shipping?", a: "No. It calculates the discount on the price you enter; other charges must be checked separately." },
      { q: "Can I combine two discounts by adding their percentages?", a: "Not always. The base and order of multiple discounts matter; calculate each step using the offer terms." },
      { q: "Does it convert currencies?", a: "No. Enter the original price and interpret the result in the same currency." },
      { q: "Is the displayed price a guarantee from a seller?", a: "No. Verify the actual offer and final checkout amount with the seller." },
      { q: "Are prices stored?", a: "The calculation is performed in your browser and the tool interface does not submit the values to Toolix." }
    ]
  },
  "meta-tag-generator": {
    lastUpdated: "2026-11-21",
    howTo: ["Enter the page title, description and URL in the generator.", "Review the preview and generated HTML in the output area.", "Copy the tags and paste them into the correct page’s document head.", "Replace the example values and verify the published page source after deployment."],
    about: [
      "Meta Tag Generator creates a copyable set of basic HTML tags from the page details you enter. It can produce a title, description, canonical URL and common Open Graph and Twitter fields. The generator is intended as a starting point for a page’s head markup; it does not publish the tags or inspect your website automatically.",
      "Write a title that identifies the page and a description that accurately summarises its content. Enter the final canonical URL for that specific page, including the correct host and path. Social metadata helps platforms identify the title and summary when a link is shared, but each platform can choose how to display a preview.",
      "The generated markup is text. You must place it in the page head through your site framework or content system. Avoid pasting duplicate title, description or canonical tags alongside tags that are already produced by your application. A duplicate or conflicting canonical can make the published page ambiguous, so inspect the final HTML after deployment.",
      "This utility does not measure search rankings or guarantee indexing. Search engines can rewrite titles and snippets, and their display may vary by query and device. A canonical tag is a hint that should point to the preferred version of the page; redirects, internal links and sitemap entries should use a consistent URL too.",
      "Use the output as a draft and review every value before publishing. The tool cannot confirm that a URL returns successfully, that the page is indexable or that your framework places markup in the correct location. The fields are handled in your browser and are not uploaded to Toolix through the generator interface."
    ],
    useCases: ["Drafting metadata for a new web page.", "Creating social sharing tags for a page.", "Preparing a canonical URL tag for a preferred page version.", "Copying a starter meta block into a website workflow."],
    examples: ["Enter a page-specific title, summary and canonical URL, copy the output, then inspect the rendered head for duplicates."],
    faqs: [
      { q: "Does this tool add tags to my website?", a: "No. It generates text for you to copy into your site or content system." },
      { q: "Will generated tags guarantee search rankings?", a: "No. Metadata does not guarantee rankings, indexing or a particular search result snippet." },
      { q: "Should I include the full canonical URL?", a: "Yes. Use the final preferred absolute URL for the specific page and keep it consistent with your site setup." },
      { q: "Why should I check for duplicate tags?", a: "Conflicting metadata can make it unclear which title, description or canonical your page intends to use." },
      { q: "Are my page details uploaded?", a: "No. The generator creates the output in your browser; it does not submit the fields to Toolix." }
    ]
  },
  "robots-txt-generator": {
    lastUpdated: "2026-11-21",
    howTo: ["Choose whether the starter file should allow or disallow all crawlers.", "Optionally enter your sitemap URL.", "Review the generated robots.txt text carefully.", "Copy or download it, then publish it at the root of the intended website and verify the live file."],
    about: [
      "Robots.txt Generator creates a small robots.txt text file from a crawl-access choice and an optional sitemap URL. The file is intended as a starter that you can review before publishing. It does not inspect your site structure, crawl pages or upload the generated file to your server.",
      "A robots.txt file gives cooperating crawlers instructions about which URL paths they may request. The allow-all option creates a broad starter rule, while the block-all option creates a rule that disallows crawling across the site. A disallow rule is not a reliable way to keep private information secure and does not guarantee that a URL disappears from search results.",
      "If you provide a sitemap URL, the generator includes it in the output. Check that it uses the correct public host and points to a working sitemap. Before publishing any crawl rule, inspect the exact text and consider which paths are intended to be crawled. A broad blocking rule can prevent useful pages and assets from being fetched by search crawlers.",
      "After copying or downloading the file, place it at the root path of the correct domain so that it is available at that site’s /robots.txt URL. Confirm the deployed contents in a browser. If your site has separate subdomains, each may need its own file. Hosting rules and other robots directives can also affect what crawlers do.",
      "Use this utility as a text generator, not as an SEO audit or access-control system. Do not rely on robots.txt to protect confidential files; use authentication or server permissions instead. The fields are processed in the browser and are not submitted to Toolix through the generator interface."
    ],
    useCases: ["Creating an allow-all starter file with a sitemap line.", "Drafting a temporary crawl-blocking rule for review.", "Preparing robots.txt text to publish at a domain root.", "Checking the wording of a basic crawler rule."],
    examples: ["Choose the desired crawl rule, add a public sitemap URL if needed, then verify the deployed /robots.txt file before relying on it."],
    faqs: [
      { q: "Does robots.txt keep a URL private?", a: "No. It is a crawler instruction, not access control. Protect private content with authentication or server permissions." },
      { q: "Where should I publish the generated file?", a: "At the root of the relevant host so it is available at that host’s /robots.txt path." },
      { q: "Does the block-all choice remove pages from search?", a: "No. Blocking a crawl does not guarantee removal from search results." },
      { q: "Can I include a sitemap?", a: "Yes. Add its public URL in the optional sitemap field and check that the destination works." },
      { q: "Does the generator publish anything?", a: "No. It creates text for you to review, copy or download; it does not change your server." }
    ]
  }
};
