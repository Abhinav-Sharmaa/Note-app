<?php
// Step 1: Retrieve the search query
$query = isset($_GET['query']) ? $_GET['query'] : '';

// Step 2: Read the website's content
$content = file_get_contents('http://www.example.com');

// Step 3: Parse the content and perform the search
$results = array();
if (!empty($query)) {
    // Find all the links on the page
    preg_match_all('/<a\s+href=["\']([^"\']+)["\']/i', $content, $matches);

    // Loop through the links and check if they match the search query
    foreach ($matches[1] as $url) {
        $page_content = file_get_contents($url);
        if (stripos($page_content, $query) !== false) {
            // The search query was found on this page
            $title = preg_match('/<title>(.*?)<\/title>/i', $page_content, $matches) ? $matches[1] : '';
            $description = preg_match('/<meta name="description" content="(.*?)"/i', $page_content, $matches) ? $matches[1] : '';

            $results[] = array(
                'title' => $title,
                'description' => $description,
                'url' => $url
            );
        }
    }
}

// Step 4: Display the search results
if (!empty($results)) {
    foreach ($results as $result) {
        echo '<a href="' . $result['url'] . '">' . $result['title'] . '</a><br />';
        echo $result['description'] . '<br /><br />';
    }
} else {
    echo 'No results found.';
}
