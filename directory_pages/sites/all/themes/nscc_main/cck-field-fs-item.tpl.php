<?php
// $Id: content-field.tpl.php,v 1.1.2.6 2009/09/11 09:20:37 markuspetrux Exp $

/**
 * @file cck-field-fs-item.tpl.php
 * Theme implementation to display the food-service items in a Daily-Items field of a Weekly Cafe Menu node.
 *
 * Available variables:
 * - $node: The node object.
 * - $field: The field array.
 * - $items: An array of values for each item in the field array.
 * - $teaser: Whether this is displayed as a teaser.
 * - $page: Whether this is displayed as a page.
 * - $field_name: The field name.
 * - $field_type: The field type.
 * - $field_name_css: The css-compatible field name.
 * - $field_type_css: The css-compatible field type.
 * - $label: The item label.
 * - $label_display: Position of label display, inline, above, or hidden.
 * - $field_empty: Whether the field has any valid value.
 *
 * Each $item in $items contains:
 * - 'view' - the themed view for that item
 *
 * @see template_preprocess_content_field()
 */
?>
<?php if (!$field_empty) : ?>
<!-- Daily Menu Items -->
<div class="field field-type-<?php print $field_type_css ?> field-<?php print $field_name_css ?> fs-day-items">
	<?php	foreach ($items as $delta => $item) : ?>
		<div class="<?php print $item['class_attr']; ?>">
			<a href="<?php print $item['node_path']; ?>" title="<?php print $item['node_title']; ?>">
				<?php print $item['img']; ?>
				<div class="fs-item-title"><?php print $item['node_title']; ?></div>
			</a>
		</div>
	<?php endforeach; ?>
	<div class="clearfix">&nbsp;</div>
</div>
<?php endif; ?>
