// Step 2: Retrieve the search query
$search_query = $_GET['search_query'];

// Step 3: Read the website's content
$content = file_get_contents('http://www.example.com');

// Step 4: Create an index file
$index = array();

// Step 5: Parse the content
$title = preg_match('/<title>(.*?)<\/title>/i', $content, $matches) ? $matches[1] : '';
$description = preg_match('/<meta name="description" content="(.*?)"/i', $content, $matches) ? $matches[1] : '';

// Step 6: Add the content to the index
$index[] = array(
    'title' => $title,
    'description' => $description,
    'url' => 'http://www.example.com'
);

// Step 7: Perform the search
$results = array();
foreach ($index as $page) {
    if (stripos($page['title'], $search_query) !== false || stripos($page['description'], $search_query) !== false) {
        $results[] = $page;
    }
}

// Display the results
foreach ($results as $result) {
    echo '<a href="' . $result['url'] . '">' . $result['title'] . '</a><br />';
    echo $result['description'] . '<br /><br />';
}
