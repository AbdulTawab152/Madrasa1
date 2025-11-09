# Laravel SearchController Fix Required

## Problem
The Laravel backend's `SearchController@global` method is trying to search for a `title` column in the `darul_iftas` table, but that table doesn't have a `title` column. It uses `question` instead.

## Error Message
```
SQLSTATE[42S22]: Column not found: 1054 Unknown column 'title' in 'WHERE' 
(Connection: mysql, SQL: select * from `darul_iftas` where `is_published` = 1 and (`title` LIKE %...)
```

## Solution
In your Laravel `SearchController@global` method, you need to use the correct column names for each model:

### For `darul_iftas` (Darul Ifta/Fatwa):
- Use `question` instead of `title` for searching
- The table structure likely has: `question`, `answer`, `slug`, etc.

### Example Fix:
```php
// In SearchController.php - global() method

// For darul_iftas, search in 'question' column instead of 'title'
$darulIftas = DarulIfta::where('is_published', 1)
    ->where(function($query) use ($searchTerm) {
        $query->where('question', 'LIKE', "%{$searchTerm}%")
              ->orWhere('answer', 'LIKE', "%{$searchTerm}%");
    })
    ->get();
```

### Other Models to Check:
Make sure each model uses the correct searchable columns:

- **Articles**: `title`, `description`
- **Blogs**: `title`, `description` or `excerpt`
- **Books**: `title`, `description`
- **Courses**: `title`, `description`
- **Authors**: `first_name`, `last_name`, `bio`
- **Events**: `title`, `description`
- **Awlyaa**: Check what columns exist (might be `name` or similar)
- **Tasawwuf**: Check what columns exist
- **Darul Ifta**: `question`, `answer` (NOT `title`)

## Testing
After fixing, test the search endpoint:
```
GET /api/search/global?q=test
```

The response should return results from all models without database errors.

