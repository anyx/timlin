<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\EmbeddedDocument
 */
class ArticleContent extends AbstractContent
{
    const CONTENT_TEXT_KEY = 'value';
    
    /**
     * @MongoDB\String
     */
    protected $text;

    /**
     * @MongoDB\Hash
     */
    protected $content;

    /**
     * @return \MongoId
     */
    public function getId()
    {
        return $this->id;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function copyContent(AbstractContent $parent)
    {
        $this->setText('');
        $content = $parent->getContent();
        if (!empty($content)) {
            $this->setContent($parent->getContent());
        } else {
            $this->setText($parent->getText());
        }
    }

    public function setText($text)
    {
        $this->text = $text;
    }

    public function getText()
    {
        return $this->text;
    }

    public function setContent($content)
    {
        $this->content = $content;
        if (is_array($content) && array_key_exists(self::CONTENT_TEXT_KEY, $content)) {
            $this->setText($content[self::CONTENT_TEXT_KEY]);
        }
    }
}
