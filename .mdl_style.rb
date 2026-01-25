all

# Отключаем проверки которые не критичны
exclude_rule 'MD013' # Line length
exclude_rule 'MD033' # Inline HTML
exclude_rule 'MD041' # First line in file should be a top level header

# Разрешаем дублирующиеся заголовки (для блогов нормально)
rule 'MD024', :allow_different_nesting => true