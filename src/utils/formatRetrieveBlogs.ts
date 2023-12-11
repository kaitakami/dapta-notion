type ApiResponse = {
  results: Array<{
    id: string,
    properties: {
      title: {
        title: Array<{ text: { content: string } }>
      },
      tags: {
        multi_select: Array<{ name: string }>
      },
      published_at: {
        date: { start: string | null }
      },
      content: {
        rich_text: Array<{ text: { content: string } }>
      }
    }
  }>
};

type FormattedData = {
  title: string,
  id: string,
  tags: string[],
  published_at: string | null,
  content: string
};

export function formatRetrieveBlogs(apiResponse: ApiResponse): FormattedData[] {
  return apiResponse.results.map(page => ({
    title: page.properties.title.title.map(t => t.text.content).join(''),
    id: page.id,
    tags: page.properties.tags.multi_select.map(tag => tag.name),
    published_at: page.properties.published_at.date?.start,
    content: page.properties.content.rich_text.map(t => t.text.content).join('')
  }));
}

type NewApiResponse = {
  properties: {
    title: {
        title: Array<{ text: { content: string } }>
    },
    tags: {
      multi_select: Array<{ name: string }>
    },
    published_at: {
        date: { start: string | null }
    },
    content: {
        rich_text: Array<{ text: { content: string } }>
    }
  }
};

type SimplifiedData = {
  title: string,
  date: string | null,
  content: string,
  tags: string[]
};

export function formatSingleBlog(apiResponse: NewApiResponse): SimplifiedData {
  const response = apiResponse;
  return {
      title: response.properties.title.title.map(t => t.text.content).join(''),
      date: response.properties.published_at.date?.start,
      content: response.properties.content.rich_text.map(t => t.text.content).join(''),
      tags: response.properties.tags.multi_select.map(tag => tag.name)
  };
}

