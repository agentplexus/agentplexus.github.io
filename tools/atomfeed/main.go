// Command atomfeed generates an Atom feed for the AgentPlexus blog.
package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

// BlogPost represents a blog post entry.
type BlogPost struct {
	Slug     string   `json:"slug"`
	Title    string   `json:"title"`
	Excerpt  string   `json:"excerpt"`
	Date     string   `json:"date"`
	ReadTime string   `json:"readTime"`
	Tags     []string `json:"tags"`
	Author   string   `json:"author"`
}

// Atom feed structures
type Feed struct {
	XMLName xml.Name `xml:"feed"`
	XMLNS   string   `xml:"xmlns,attr"`
	Title   string   `xml:"title"`
	Link    []Link   `xml:"link"`
	Updated string   `xml:"updated"`
	ID      string   `xml:"id"`
	Author  Author   `xml:"author"`
	Entries []Entry  `xml:"entry"`
}

type Link struct {
	Href string `xml:"href,attr"`
	Rel  string `xml:"rel,attr,omitempty"`
	Type string `xml:"type,attr,omitempty"`
}

type Author struct {
	Name string `xml:"name"`
}

type Entry struct {
	Title     string   `xml:"title"`
	Link      Link     `xml:"link"`
	ID        string   `xml:"id"`
	Updated   string   `xml:"updated"`
	Published string   `xml:"published"`
	Summary   Summary  `xml:"summary"`
	Author    Author   `xml:"author"`
	Category  []Category `xml:"category,omitempty"`
}

type Summary struct {
	Type    string `xml:"type,attr"`
	Content string `xml:",chardata"`
}

type Category struct {
	Term string `xml:"term,attr"`
}

const (
	baseURL    = "https://agentplexus.github.io"
	feedTitle  = "AgentPlexus Blog"
	feedAuthor = "AgentPlexus Team"
)

// findRepoRoot finds the repository root by looking for content directory
func findRepoRoot() (string, error) {
	// Start from the current directory
	dir, err := os.Getwd()
	if err != nil {
		return "", err
	}

	// Walk up until we find the content directory (unique to repo root)
	for {
		contentDir := filepath.Join(dir, "content", "data")
		if info, err := os.Stat(contentDir); err == nil && info.IsDir() {
			return dir, nil
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			return "", fmt.Errorf("could not find repo root (no content/data directory found)")
		}
		dir = parent
	}
}

func main() {
	// Find repo root to locate files correctly
	repoRoot, err := findRepoRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	// Read blog posts from JSON file
	postsFile := filepath.Join(repoRoot, "content", "data", "blog-posts.json")
	data, err := os.ReadFile(postsFile)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading %s: %v\n", postsFile, err)
		os.Exit(1)
	}

	var posts []BlogPost
	if err := json.Unmarshal(data, &posts); err != nil {
		fmt.Fprintf(os.Stderr, "Error parsing JSON: %v\n", err)
		os.Exit(1)
	}

	// Find the most recent update time
	var latestUpdate time.Time
	for _, post := range posts {
		t, err := time.Parse("2006-01-02", post.Date)
		if err != nil {
			continue
		}
		if t.After(latestUpdate) {
			latestUpdate = t
		}
	}

	// Build feed
	feed := Feed{
		XMLNS:   "http://www.w3.org/2005/Atom",
		Title:   feedTitle,
		Updated: latestUpdate.Format(time.RFC3339),
		ID:      baseURL + "/blog",
		Author:  Author{Name: feedAuthor},
		Link: []Link{
			{Href: baseURL + "/blog/atom.xml", Rel: "self", Type: "application/atom+xml"},
			{Href: baseURL + "/blog", Rel: "alternate", Type: "text/html"},
		},
	}

	// Add entries
	for _, post := range posts {
		postDate, _ := time.Parse("2006-01-02", post.Date)
		postURL := fmt.Sprintf("%s/blog/%s", baseURL, post.Slug)

		entry := Entry{
			Title:     post.Title,
			Link:      Link{Href: postURL, Rel: "alternate", Type: "text/html"},
			ID:        postURL,
			Updated:   postDate.Format(time.RFC3339),
			Published: postDate.Format(time.RFC3339),
			Summary:   Summary{Type: "text", Content: post.Excerpt},
			Author:    Author{Name: post.Author},
		}

		for _, tag := range post.Tags {
			entry.Category = append(entry.Category, Category{Term: tag})
		}

		feed.Entries = append(feed.Entries, entry)
	}

	// Generate XML
	output, err := xml.MarshalIndent(feed, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error generating XML: %v\n", err)
		os.Exit(1)
	}

	// Write to apps/web/public/blog/atom.xml
	atomFile := filepath.Join(repoRoot, "apps", "web", "public", "blog", "atom.xml")
	xmlContent := xml.Header + string(output)
	if err := os.WriteFile(atomFile, []byte(xmlContent), 0644); err != nil {
		fmt.Fprintf(os.Stderr, "Error writing %s: %v\n", atomFile, err)
		os.Exit(1)
	}

	fmt.Printf("Generated %s with %d entries\n", atomFile, len(posts))
}
