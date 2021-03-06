<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use JMS\Serializer\Annotation as Serializer;

/**
 * @MongoDB\MappedSuperclass
 */
abstract class AbstractContent
{
    /**
     * @MongoDB\Id()
     * @Serializer\Groups({"Editor", "Viewer"})
     */
    protected $id;

    /**
     * @Serializer\Groups({"Editor", "Viewer"})
     * @MongoDB\String
     */
    protected $parentId;

    /**
     * @MongoDB\String
     * @Serializer\Groups({"Editor", "Viewer"})
     */
    protected $title;

    /**
     * @MongoDB\Boolean
     * @Serializer\Groups({"Editor"})
     */
    public $published = false;

    /**
     * @MongoDB\Date
     * @Serializer\Groups({"Editor"})
     * @Serializer\Type("DateTime")
     */
    protected $createdAt;

    /**
     * @MongoDB\Date
     * @Serializer\Groups({"Editor", "Viewer"})
     */
    protected $updatedAt;

    /**
     * 
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    abstract public function copyContent(AbstractContent $parent);

    /**
     * 
     * @param \App\Document\AbstractContent $parent
     */
    public function __construct(AbstractContent $parent = null)
    {
        $this->id = (string) new \MongoId();

        if (!empty($parent)) {
            $this->parentId = $parent->getId();
            $this->copyContent($parent);
        }
    }

    /**
     * 
     * @return string
     */
    public function getParentId()
    {
        return $this->parentId;
    }

    /**
     * 
     * @return boolean
     */
    public function hasParent()
    {
        return !empty($this->parentId);
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * 
     * @return boolean
     */
    public function isPublished()
    {
        return $this->published;
    }

    public function publish()
    {
        $this->published = true;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function getPublished()
    {
        return $this->published;
    }

    /**
     * @MongoDB\PrePersist
     */
    public function OnPersistSetCreatedAt()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    /**
     * @MongoDB\PreUpdate
     */
    public function OnUpdateUpdatedAt()
    {
        $this->updatedAt = new \DateTime();
    }
}
